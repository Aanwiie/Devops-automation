const { exec } = require('child_process');
const axios = require('axios');

/**
 * Worker class handles background job processing
 */
class Worker {
  constructor(queueManager, config) {
    this.queueManager = queueManager;
    this.config = config;
    this.isRunning = false;
    this.pollInterval = null;
  }

  /**
   * Start the worker to continuously poll for jobs
   */
  async start() {
    if (this.isRunning) {
      console.log('Worker is already running');
      return;
    }

    this.isRunning = true;
    console.log('Worker started, polling for jobs...');
    
    // Start polling loop
    this.pollForJobs();
  }

  /**
   * Stop the worker gracefully
   */
  async stop() {
    if (!this.isRunning) {
      console.log('Worker is not running');
      return;
    }

    this.isRunning = false;
    
    if (this.pollInterval) {
      clearTimeout(this.pollInterval);
      this.pollInterval = null;
    }
    
    console.log('Worker stopped');
  }

  /**
   * Continuously poll Redis queue for new jobs
   */
  async pollForJobs() {
    while (this.isRunning) {
      try {
        // Check if queue manager is healthy
        if (!this.queueManager.isHealthy()) {
          console.log('Queue manager not healthy, waiting...');
          await this.sleep(this.config.pollInterval);
          continue;
        }

        // Try to get a job from the queue
        const job = await this.queueManager.dequeueJob();
        
        if (job) {
          // Process the job
          await this.processJob(job);
        }
        
        // Small delay to prevent tight polling when no jobs available
        await this.sleep(100);
        
      } catch (error) {
        console.error('Error in job polling loop:', error.message);
        // Wait before retrying to avoid rapid error loops
        await this.sleep(this.config.pollInterval);
      }
    }
  }

  /**
   * Process a single job
   */
  async processJob(job) {
    const { jobId, command } = job;
    
    try {
      console.log(`Processing job ${jobId}: ${command}`);
      
      // Update job status to running
      await this.queueManager.updateJobStatus(jobId, 'running');
      
      // Execute the command
      const result = await this.executeCommand(command);
      
      // Update job status based on execution result
      if (result.success) {
        await this.queueManager.updateJobStatus(jobId, 'completed', result.logs);
        console.log(`Job ${jobId} completed successfully`);
      } else {
        await this.queueManager.updateJobStatus(jobId, 'failed', result.logs);
        console.log(`Job ${jobId} failed`);
      }
      
      // Send callback to Hub
      await this.sendHubUpdate(jobId, result.success ? 'completed' : 'failed', result.logs);
      
    } catch (error) {
      console.error(`Error processing job ${jobId}:`, error.message);
      
      try {
        const errorLogs = [`Error: ${error.message}`];
        await this.queueManager.updateJobStatus(jobId, 'failed', errorLogs);
        await this.sendHubUpdate(jobId, 'failed', errorLogs);
      } catch (updateError) {
        console.error(`Failed to update job ${jobId} status after error:`, updateError.message);
      }
    }
  }

  /**
   * Execute a command using child_process.exec
   */
  async executeCommand(command) {
    return new Promise((resolve) => {
      const logs = [];
      const startTime = Date.now();
      
      console.log(`Executing command: ${command}`);
      
      const childProcess = exec(command, {
        timeout: this.config.jobTimeout,
        maxBuffer: 1024 * 1024 // 1MB buffer
      });

      // Capture stdout
      childProcess.stdout.on('data', (data) => {
        const output = data.toString().trim();
        if (output) {
          logs.push(`[stdout] ${output}`);
          console.log(`Job output: ${output}`);
        }
      });

      // Capture stderr
      childProcess.stderr.on('data', (data) => {
        const output = data.toString().trim();
        if (output) {
          logs.push(`[stderr] ${output}`);
          console.log(`Job error: ${output}`);
        }
      });

      // Handle process completion
      childProcess.on('close', (code, signal) => {
        const duration = Date.now() - startTime;
        
        if (signal) {
          logs.push(`[system] Process terminated by signal: ${signal}`);
          console.log(`Command terminated by signal ${signal} after ${duration}ms`);
          resolve({ success: false, logs, code: null, signal });
        } else {
          logs.push(`[system] Process exited with code: ${code}`);
          console.log(`Command completed with code ${code} after ${duration}ms`);
          resolve({ success: code === 0, logs, code, signal: null });
        }
      });

      // Handle execution errors
      childProcess.on('error', (error) => {
        logs.push(`[system] Execution error: ${error.message}`);
        console.error(`Command execution error: ${error.message}`);
        resolve({ success: false, logs, code: null, signal: null });
      });
    });
  }

  /**
   * Send job status update to MCP Hub
   */
  async sendHubUpdate(jobId, status, logs) {
    try {
      const payload = {
        jobId,
        status,
        logs: logs || [],
        completedAt: new Date().toISOString()
      };

      console.log(`Sending Hub update for job ${jobId}: ${status}`);
      
      const response = await axios.post(this.config.hubUrl, payload, {
        timeout: 5000, // 5 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status >= 200 && response.status < 300) {
        console.log(`Hub update sent successfully for job ${jobId}`);
      } else {
        console.warn(`Hub update returned status ${response.status} for job ${jobId}`);
      }
      
    } catch (error) {
      // Log the error but don't throw - we don't want Hub callback failures to stop job processing
      if (error.code === 'ECONNREFUSED') {
        console.warn(`Hub callback failed for job ${jobId}: Connection refused (Hub may be down)`);
      } else if (error.code === 'ETIMEDOUT') {
        console.warn(`Hub callback failed for job ${jobId}: Request timeout`);
      } else {
        console.warn(`Hub callback failed for job ${jobId}:`, error.message);
      }
    }
  }

  /**
   * Sleep for specified milliseconds
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = Worker;