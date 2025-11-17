require('dotenv').config();
const mongoose = require('mongoose');
const { Worker } = require('bullmq');
const { connection } = require('../queue/queue');
const Job = require('../models/Job');
const { spawn } = require('child_process');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mcp_hub';
const queueName = process.env.QUEUE_NAME || 'builds';

async function connectMongo() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Agent connected to MongoDB');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runCommand(jobDoc, cmd, appendLog) {
  appendLog(`Starting command: ${cmd}`);
  return new Promise((resolve, reject) => {
    // Use sh -lc so complex commands and pipes work; in alpine this is /bin/sh (ash)
    const child = spawn('sh', ['-lc', cmd], { env: process.env });

    child.stdout.on('data', (data) => {
      const text = data.toString();
      appendLog(text.trim());
    });

    child.stderr.on('data', (data) => {
      const text = data.toString();
      appendLog(`ERR> ${text.trim()}`);
    });

    child.on('error', (err) => {
      appendLog(`Failed to spawn command: ${err.message}`);
      reject(err);
    });

    child.on('close', (code, signal) => {
      appendLog(`Command finished with code=${code}${signal ? ' signal='+signal : ''}`);
      if (code === 0) resolve(code);
      else reject(new Error(`Command "${cmd}" exited with code ${code}`));
    });
  });
}

async function startWorker() {
  await connectMongo();

  const worker = new Worker(queueName, async (job) => {
    const jobId = job.data.jobId;
    const jobDoc = await Job.findById(jobId);
    if (!jobDoc) {
      console.warn('Job doc not found for id', jobId);
      return;
    }

    const appendLog = async (msg) => {
      jobDoc.logs.push({ message: msg });
      jobDoc.markModified('logs');
      await jobDoc.save();
      console.log(`[job:${jobId}] ${msg}`);
    };

    try {
      jobDoc.status = 'running';
      jobDoc.startedAt = new Date();
      await jobDoc.save();

      const commands = jobDoc.commands || [];
      for (const cmd of commands) {
        await appendLog('---');
        try {
          await runCommand(jobDoc, cmd, appendLog);
        } catch (err) {
          await appendLog('ERROR: ' + err.message);
          throw err;
        }
      }

      jobDoc.status = 'success';
      jobDoc.finishedAt = new Date();
      await jobDoc.save();
      return { ok: true };
    } catch (err) {
      jobDoc.status = 'failed';
      jobDoc.finishedAt = new Date();
      jobDoc.logs.push({ message: `ERROR: ${err.message}` });
      await jobDoc.save();
      throw err;
    }
  }, { connection });

  worker.on('completed', (job) => {
    console.log('Worker completed job', job.id);
  });

  worker.on('failed', (job, err) => {
    console.error('Worker failed job', job?.id, err?.message);
  });

  console.log('Agent worker started, waiting for jobs...');
}

startWorker().catch(err => {
  console.error('Agent failed to start:', err);
  process.exit(1);
});
