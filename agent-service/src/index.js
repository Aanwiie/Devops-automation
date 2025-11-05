require('dotenv').config();
const express = require('express');
const QueueManager = require('./queue');
const Worker = require('./worker');

/**
 * Main Agent Service application
 */
class AgentService {
  constructor() {
    this.app = express();
    this.server = null;
    this.queueManager = null;
    this.worker = null;
    
    // Configuration from environment variables
    this.config = {
      port: process.env.PORT || 4000,
      redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
      hubUrl: process.env.HUB_URL || 'http://localhost:3000/hub/update-status',
      jobTimeout: parseInt(process.env.JOB_TIMEOUT) || 300000,
      pollInterval: parseInt(process.env.POLL_INTERVAL) || 1000,
      logLevel: process.env.LOG_LEVEL || 'info'
    };
  }

  /**
   * Initialize the application
   */
  async initialize() {
    try {
      // Validate required configuration
      this.validateConfig();
      
      // Setup Express middleware
      this.setupMiddleware();
      
      // Setup routes
      this.setupRoutes();
      
      // Initialize queue manager (but don't fail if Redis is unavailable)
      this.queueManager = new QueueManager(this.config.redisUrl);
      try {
        await this.queueManager.connect();
        console.log('Redis connection established');
      } catch (redisError) {
        console.warn('Redis connection failed, service will start in degraded mode:', redisError.message);
        console.warn('Job submission and processing will be unavailable until Redis is connected');
      }
      
      // Initialize worker
      this.worker = new Worker(this.queueManager, this.config);
      
      console.log('Agent Service initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize Agent Service:', error.message);
      throw error;
    }
  }

  /**
   * Validate required configuration
   */
  validateConfig() {
    const required = ['redisUrl', 'hubUrl'];
    const missing = required.filter(key => !this.config[key]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.map(k => k.toUpperCase()).join(', ')}`);
    }
    
    // Validate port is a valid number
    if (isNaN(this.config.port) || this.config.port < 1 || this.config.port > 65535) {
      throw new Error('PORT must be a valid number between 1 and 65535');
    }
    
    // Validate timeout values
    if (this.config.jobTimeout < 1000) {
      console.warn('JOB_TIMEOUT is very low, using minimum of 1000ms');
      this.config.jobTimeout = 1000;
    }
    
    if (this.config.pollInterval < 100) {
      console.warn('POLL_INTERVAL is very low, using minimum of 100ms');
      this.config.pollInterval = 100;
    }
    
    console.log('Configuration validated successfully');
    console.log(`- Port: ${this.config.port}`);
    console.log(`- Job Timeout: ${this.config.jobTimeout}ms`);
    console.log(`- Poll Interval: ${this.config.pollInterval}ms`);
  }

  /**
   * Setup Express middleware
   */
  setupMiddleware() {
    // Parse JSON bodies
    this.app.use(express.json({ limit: '10mb' }));
    
    // Basic logging middleware
    this.app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
    
    // Error handling middleware
    this.app.use((err, req, res, next) => {
      console.error('Express error:', err.message);
      res.status(500).json({
        error: 'Internal server error',
        message: err.message
      });
    });
  }

  /**
   * Setup API routes
   */
  setupRoutes() {
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        queue: {
          healthy: this.queueManager ? this.queueManager.isHealthy() : false,
          mode: this.queueManager ? this.queueManager.getMode() : 'unknown'
        },
        version: '1.0.0'
      };
      res.json(health);
    });

    // Simple test endpoint that doesn't require Redis
    this.app.get('/test', (req, res) => {
      res.json({
        message: 'Agent Service is running!',
        timestamp: new Date().toISOString(),
        config: {
          port: this.config.port,
          queueMode: this.queueManager ? this.queueManager.getMode() : 'unknown',
          queueHealthy: this.queueManager ? this.queueManager.isHealthy() : false
        }
      });
    });

    // POST /run - Submit a job for execution
    this.app.post('/run', async (req, res) => {
      try {
        const { jobId, command } = req.body;
        
        // Validate request payload
        if (!jobId || typeof jobId !== 'string') {
          return res.status(400).json({
            error: 'Bad Request',
            message: 'jobId is required and must be a string'
          });
        }
        
        if (!command || typeof command !== 'string') {
          return res.status(400).json({
            error: 'Bad Request',
            message: 'command is required and must be a string'
          });
        }
        
        // Check if Redis is available
        if (!this.queueManager || !this.queueManager.isHealthy()) {
          return res.status(503).json({
            error: 'Service Unavailable',
            message: 'Redis connection not available'
          });
        }
        
        // Enqueue the job
        const job = await this.queueManager.enqueueJob(jobId, command);
        
        console.log(`Job submitted: ${jobId} - ${command}`);
        
        res.status(200).json({
          jobId: job.jobId,
          status: job.status
        });
        
      } catch (error) {
        console.error('Error submitting job:', error.message);
        
        if (error.message.includes('Redis connection')) {
          return res.status(503).json({
            error: 'Service Unavailable',
            message: 'Unable to process job due to Redis connection issue'
          });
        }
        
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Failed to submit job'
        });
      }
    });

    // GET /status/:jobId - Get job status and logs
    this.app.get('/status/:jobId', async (req, res) => {
      try {
        const { jobId } = req.params;
        
        // Validate jobId parameter
        if (!jobId || typeof jobId !== 'string') {
          return res.status(400).json({
            error: 'Bad Request',
            message: 'jobId parameter is required and must be a string'
          });
        }
        
        // Check if Redis is available
        if (!this.queueManager || !this.queueManager.isHealthy()) {
          return res.status(503).json({
            error: 'Service Unavailable',
            message: 'Redis connection not available'
          });
        }
        
        // Get job status from Redis
        const jobData = await this.queueManager.getJobStatus(jobId);
        
        if (!jobData) {
          return res.status(404).json({
            error: 'Not Found',
            message: `Job with ID '${jobId}' not found`
          });
        }
        
        console.log(`Status requested for job: ${jobId} - ${jobData.status}`);
        
        res.status(200).json({
          jobId: jobData.jobId,
          status: jobData.status,
          logs: jobData.logs || [],
          createdAt: jobData.createdAt,
          startedAt: jobData.startedAt,
          completedAt: jobData.completedAt
        });
        
      } catch (error) {
        console.error('Error getting job status:', error.message);
        
        if (error.message.includes('Redis connection')) {
          return res.status(503).json({
            error: 'Service Unavailable',
            message: 'Unable to retrieve job status due to Redis connection issue'
          });
        }
        
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Failed to retrieve job status'
        });
      }
    });
  }

  /**
   * Start the server
   */
  async start() {
    try {
      await this.initialize();
      
      this.server = this.app.listen(this.config.port, () => {
        console.log(`Agent Service listening on port ${this.config.port}`);
        console.log(`Redis URL: ${this.config.redisUrl}`);
        console.log(`Hub URL: ${this.config.hubUrl}`);
      });
      
      // Start worker (only if Redis is available)
      if (this.queueManager && this.queueManager.isHealthy()) {
        await this.worker.start();
        console.log('Background worker started successfully');
      } else {
        console.warn('Background worker not started - Redis connection required');
      }
      
      // Setup graceful shutdown
      this.setupGracefulShutdown();
      
    } catch (error) {
      console.error('Failed to start Agent Service:', error.message);
      process.exit(1);
    }
  }

  /**
   * Setup graceful shutdown handling
   */
  setupGracefulShutdown() {
    const shutdown = async (signal) => {
      console.log(`Received ${signal}, shutting down gracefully...`);
      
      try {
        // Stop accepting new connections
        if (this.server) {
          this.server.close();
        }
        
        // Stop worker
        if (this.worker) {
          await this.worker.stop();
        }
        
        // Close Redis connection
        if (this.queueManager) {
          await this.queueManager.close();
        }
        
        console.log('Agent Service shut down successfully');
        process.exit(0);
        
      } catch (error) {
        console.error('Error during shutdown:', error.message);
        process.exit(1);
      }
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  }
}

// Start the application if this file is run directly
if (require.main === module) {
  const service = new AgentService();
  service.start().catch(error => {
    console.error('Failed to start service:', error.message);
    process.exit(1);
  });
}

module.exports = AgentService;