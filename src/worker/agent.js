require('dotenv').config();
const mongoose = require('mongoose');
const { Worker } = require('bullmq');
const { connection } = require('../queue/queue');
const Job = require('../models/Job');
const { spawn } = require('child_process');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mcp_hub';
const queueName = process.env.QUEUE_NAME || 'builds';
const COMMAND_TIMEOUT = parseInt(process.env.COMMAND_TIMEOUT || '300000'); // 5 minutes default
const MAX_CONCURRENT_JOBS = parseInt(process.env.MAX_CONCURRENT_JOBS || '3');

let worker;
let isShuttingDown = false;

// Connect to MongoDB
async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✓ Agent connected to MongoDB');
  } catch (err) {
    console.error('✗ Failed to connect to MongoDB:', err);
    throw err;
  }
}

// Run a single command with timeout
async function runCommand(jobDoc, cmd, appendLog) {
  appendLog(`▶ Starting command: ${cmd}`);
  
  return new Promise((resolve, reject) => {
    let isTimedOut = false;
    let child;

    // Timeout handler
    const timeoutId = setTimeout(() => {
      isTimedOut = true;
      appendLog(`⏱ Command timed out after ${COMMAND_TIMEOUT / 1000}s`);
      if (child && !child.killed) {
        child.kill('SIGTERM');
        setTimeout(() => {
          if (child && !child.killed) {
            child.kill('SIGKILL');
          }
        }, 5000);
      }
      reject(new Error(`Command timed out after ${COMMAND_TIMEOUT / 1000}s`));
    }, COMMAND_TIMEOUT);

    try {
      // Use sh -lc for better command compatibility
      child = spawn('sh', ['-lc', cmd], { 
        env: { ...process.env },
        shell: false
      });

      let stdoutBuffer = '';
      let stderrBuffer = '';

      child.stdout.on('data', (data) => {
        const text = data.toString();
        stdoutBuffer += text;
        
        // Log in chunks to avoid too many DB writes
        if (stdoutBuffer.length > 500 || stdoutBuffer.includes('\n')) {
          const lines = stdoutBuffer.split('\n');
          stdoutBuffer = lines.pop() || '';
          lines.forEach(line => {
            if (line.trim()) appendLog(line.trim());
          });
        }
      });

      child.stderr.on('data', (data) => {
        const text = data.toString();
        stderrBuffer += text;
        
        if (stderrBuffer.length > 500 || stderrBuffer.includes('\n')) {
          const lines = stderrBuffer.split('\n');
          stderrBuffer = lines.pop() || '';
          lines.forEach(line => {
            if (line.trim()) appendLog(`⚠ ${line.trim()}`);
          });
        }
      });

      child.on('error', (err) => {
        clearTimeout(timeoutId);
        appendLog(`✗ Failed to spawn command: ${err.message}`);
        reject(err);
      });

      child.on('close', (code, signal) => {
        clearTimeout(timeoutId);
        
        // Flush remaining buffers
        if (stdoutBuffer.trim()) appendLog(stdoutBuffer.trim());
        if (stderrBuffer.trim()) appendLog(`⚠ ${stderrBuffer.trim()}`);

        if (isTimedOut) return; // Already rejected

        const signalText = signal ? ` (signal: ${signal})` : '';
        appendLog(`■ Command finished with exit code ${code}${signalText}`);
        
        if (code === 0) {
          resolve(code);
        } else {
          reject(new Error(`Command exited with code ${code}${signalText}`));
        }
      });

    } catch (err) {
      clearTimeout(timeoutId);
      reject(err);
    }
  });
}

// Process a job
async function processJob(job) {
  const jobId = job.data.jobId;
  let jobDoc;

  try {
    jobDoc = await Job.findById(jobId);
    
    if (!jobDoc) {
      console.warn(`⚠ Job document not found for id: ${jobId}`);
      throw new Error('Job document not found');
    }

    // Check if job was cancelled
    if (jobDoc.status === 'cancelled') {
      console.log(`⊘ Job ${jobId} was cancelled`);
      return { ok: false, reason: 'cancelled' };
    }

    console.log(`▶ Processing job ${jobId}: ${jobDoc.name}`);

    // Create optimized log appender with batching
    let logBuffer = [];
    let lastSave = Date.now();
    
    const appendLog = async (msg) => {
      logBuffer.push(msg);
      const now = Date.now();
      
      // Save logs every 2 seconds or every 50 messages
      if (logBuffer.length >= 50 || now - lastSave > 2000) {
        const messages = [...logBuffer];
        logBuffer = [];
        lastSave = now;
        
        try {
          for (const message of messages) {
            jobDoc.logs.push({ message });
          }
          jobDoc.markModified('logs');
          await jobDoc.save();
        } catch (err) {
          console.error('Error saving logs:', err.message);
        }
      }
      
      console.log(`[job:${jobId}] ${msg}`);
    };

    // Flush remaining logs helper
    const flushLogs = async () => {
      if (logBuffer.length > 0) {
        const messages = [...logBuffer];
        logBuffer = [];
        for (const message of messages) {
          jobDoc.logs.push({ message });
        }
        jobDoc.markModified('logs');
        await jobDoc.save();
      }
    };

    // Update job status to running
    jobDoc.status = 'running';
    jobDoc.startedAt = new Date();
    await jobDoc.save();

    await appendLog('═══════════════════════════════════════');
    await appendLog(`Job: ${jobDoc.name}`);
    if (jobDoc.repo) await appendLog(`Repo: ${jobDoc.repo}`);
    if (jobDoc.commit) await appendLog(`Commit: ${jobDoc.commit}`);
    await appendLog('═══════════════════════════════════════');

    // Execute commands sequentially
    const commands = jobDoc.commands || [];
    
    if (commands.length === 0) {
      await appendLog('⚠ No commands to execute');
    }

    for (let i = 0; i < commands.length; i++) {
      const cmd = commands[i];
      await appendLog(`\n[${i + 1}/${commands.length}] ───────────────────────────────`);
      
      try {
        await runCommand(jobDoc, cmd, appendLog);
      } catch (err) {
        await appendLog(`✗ ERROR: ${err.message}`);
        await flushLogs();
        throw err;
      }
    }

    // Flush any remaining logs
    await flushLogs();

    // Mark as success
    jobDoc.status = 'success';
    jobDoc.finishedAt = new Date();
    await jobDoc.save();

    const duration = ((jobDoc.finishedAt - jobDoc.startedAt) / 1000).toFixed(2);
    console.log(`✓ Job ${jobId} completed successfully in ${duration}s`);

    return { ok: true };

  } catch (err) {
    console.error(`✗ Job ${jobId} failed:`, err.message);

    if (jobDoc) {
      try {
        jobDoc.status = 'failed';
        jobDoc.finishedAt = new Date();
        jobDoc.logs.push({ message: `\n✗ JOB FAILED: ${err.message}` });
        await jobDoc.save();
      } catch (saveErr) {
        console.error('Error saving failed job state:', saveErr);
      }
    }

    throw err;
  }
}

// Start the worker
async function startWorker() {
  try {
    await connectMongo();

    worker = new Worker(queueName, processJob, {
      connection,
      concurrency: MAX_CONCURRENT_JOBS,
      limiter: {
        max: 10,
        duration: 1000
      }
    });

    worker.on('completed', (job) => {
      console.log(`✓ Worker completed job ${job.id}`);
    });

    worker.on('failed', (job, err) => {
      console.error(`✗ Worker failed job ${job?.id}:`, err?.message);
    });

    worker.on('error', (err) => {
      console.error('✗ Worker error:', err);
    });

    console.log('✓ Agent worker started');
    console.log(`  Queue: ${queueName}`);
    console.log(`  Concurrency: ${MAX_CONCURRENT_JOBS}`);
    console.log(`  Command timeout: ${COMMAND_TIMEOUT / 1000}s`);
    console.log('  Waiting for jobs...\n');

  } catch (err) {
    console.error('✗ Agent failed to start:', err);
    process.exit(1);
  }
}

// Graceful shutdown
async function shutdown(signal) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`\n${signal} received. Starting graceful shutdown...`);

  if (worker) {
    console.log('Waiting for active jobs to complete...');
    await worker.close();
    console.log('✓ Worker closed');
  }

  try {
    await mongoose.connection.close();
    console.log('✓ MongoDB connection closed');
  } catch (err) {
    console.error('✗ Error closing MongoDB:', err);
  }

  process.exit(0);
}

// Handle shutdown signals
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Handle uncaught errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  shutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  shutdown('unhandledRejection');
});

// Start the worker
startWorker();
