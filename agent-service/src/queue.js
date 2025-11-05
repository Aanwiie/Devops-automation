const { createClient } = require('redis');

/**
 * QueueManager handles Redis operations for job queue management
 * Falls back to in-memory storage when Redis is unavailable
 */
class QueueManager {
    constructor(redisUrl) {
        this.redisUrl = redisUrl;
        this.client = null;
        this.isConnected = false;

        // In-memory fallback storage
        this.memoryMode = false;
        this.jobQueue = [];
        this.jobData = new Map();
    }

    /**
     * Initialize Redis connection with error handling and reconnection logic
     * Falls back to memory mode if Redis is unavailable
     */
    async connect() {
        try {
            this.client = createClient({
                url: this.redisUrl,
                socket: {
                    reconnectStrategy: (retries) => {
                        if (retries > 5) {
                            console.log('Redis connection failed after multiple attempts, switching to memory mode');
                            this.memoryMode = true;
                            return false; // Stop reconnecting
                        }
                        // Exponential backoff: 50ms, 100ms, 200ms, 400ms, max 3000ms
                        const delay = Math.min(50 * Math.pow(2, retries), 3000);
                        console.log(`Redis reconnection attempt ${retries + 1} in ${delay}ms`);
                        return delay;
                    }
                }
            });

            // Set up event listeners
            this.client.on('connect', () => {
                console.log('Redis client connecting...');
            });

            this.client.on('ready', () => {
                console.log('Redis client connected and ready');
                this.isConnected = true;
                this.memoryMode = false;
            });

            this.client.on('error', (err) => {
                console.error('Redis client error:', err.message);
                this.isConnected = false;
                if (!this.memoryMode) {
                    console.log('Switching to in-memory mode for job storage');
                    this.memoryMode = true;
                }
            });

            this.client.on('end', () => {
                console.log('Redis client connection ended');
                this.isConnected = false;
            });

            // Connect to Redis
            await this.client.connect();

        } catch (error) {
            console.error('Failed to connect to Redis, using in-memory storage:', error.message);
            this.isConnected = false;
            this.memoryMode = true;
        }
    }

    /**
     * Check if queue is healthy (Redis or memory mode)
     */
    isHealthy() {
        return this.memoryMode || (this.isConnected && this.client && this.client.isReady);
    }

    /**
     * Add a job to the queue (Redis or memory)
     */
    async enqueueJob(jobId, command) {
        if (!this.isHealthy()) {
            throw new Error('Queue not available');
        }

        const job = {
            jobId,
            command,
            status: 'queued',
            createdAt: new Date().toISOString(),
            logs: []
        };

        if (this.memoryMode) {
            // In-memory storage
            this.jobData.set(jobId, { ...job });
            this.jobQueue.push(jobId);
            console.log(`Job ${jobId} enqueued successfully (memory mode)`);
        } else {
            // Redis storage
            try {
                await this.client.hSet(`job:${jobId}:data`, job);
                await this.client.set(`job:${jobId}:status`, 'queued');
                await this.client.lPush('jobs:queue', jobId);
                console.log(`Job ${jobId} enqueued successfully (Redis mode)`);
            } catch (error) {
                console.error(`Failed to enqueue job ${jobId}:`, error.message);
                throw error;
            }
        }

        return job;
    }

    /**
     * Get the next job from the queue
     */
    async dequeueJob() {
        if (!this.isHealthy()) {
            throw new Error('Queue not available');
        }

        if (this.memoryMode) {
            // In-memory storage
            const jobId = this.jobQueue.shift();
            if (!jobId) {
                return null; // No job available
            }

            const jobData = this.jobData.get(jobId);
            if (!jobData) {
                console.warn(`Job data not found for jobId: ${jobId}`);
                return null;
            }

            console.log(`Job ${jobId} dequeued for processing (memory mode)`);
            return jobData;
        } else {
            // Redis storage
            try {
                const result = await this.client.brPop('jobs:queue', 1);

                if (!result) {
                    return null; // No job available
                }

                const jobId = result.element;
                const jobData = await this.client.hGetAll(`job:${jobId}:data`);

                if (!jobData || !jobData.jobId) {
                    console.warn(`Job data not found for jobId: ${jobId}`);
                    return null;
                }

                // Parse logs array
                jobData.logs = jobData.logs ? JSON.parse(jobData.logs) : [];

                console.log(`Job ${jobId} dequeued for processing (Redis mode)`);
                return jobData;

            } catch (error) {
                console.error('Failed to dequeue job:', error.message);
                throw error;
            }
        }
    }

    /**
     * Update job status and logs
     */
    async updateJobStatus(jobId, status, logs = []) {
        if (!this.isHealthy()) {
            throw new Error('Queue not available');
        }

        if (this.memoryMode) {
            // In-memory storage
            const jobData = this.jobData.get(jobId);
            if (jobData) {
                jobData.status = status;
                jobData.logs = logs;

                if (status === 'running') {
                    jobData.startedAt = new Date().toISOString();
                } else if (status === 'completed' || status === 'failed') {
                    jobData.completedAt = new Date().toISOString();
                }

                this.jobData.set(jobId, jobData);
                console.log(`Job ${jobId} status updated to: ${status} (memory mode)`);
            }
        } else {
            // Redis storage
            try {
                await this.client.set(`job:${jobId}:status`, status);

                const updates = {
                    status,
                    logs: JSON.stringify(logs)
                };

                if (status === 'running') {
                    updates.startedAt = new Date().toISOString();
                } else if (status === 'completed' || status === 'failed') {
                    updates.completedAt = new Date().toISOString();
                }

                await this.client.hSet(`job:${jobId}:data`, updates);
                console.log(`Job ${jobId} status updated to: ${status} (Redis mode)`);

            } catch (error) {
                console.error(`Failed to update job ${jobId} status:`, error.message);
                throw error;
            }
        }
    }

    /**
     * Get job status and logs
     */
    async getJobStatus(jobId) {
        if (!this.isHealthy()) {
            throw new Error('Queue not available');
        }

        if (this.memoryMode) {
            // In-memory storage
            const jobData = this.jobData.get(jobId);
            return jobData ? { ...jobData } : null;
        } else {
            // Redis storage
            try {
                const jobData = await this.client.hGetAll(`job:${jobId}:data`);

                if (!jobData || !jobData.jobId) {
                    return null; // Job not found
                }

                // Parse logs array
                jobData.logs = jobData.logs ? JSON.parse(jobData.logs) : [];

                return jobData;

            } catch (error) {
                console.error(`Failed to get job ${jobId} status:`, error.message);
                throw error;
            }
        }
    }

    /**
     * Get queue mode information
     */
    getMode() {
        return this.memoryMode ? 'memory' : 'redis';
    }

    /**
     * Gracefully close connections and clear memory
     */
    async close() {
        if (this.client) {
            try {
                await this.client.quit();
                console.log('Redis connection closed gracefully');
            } catch (error) {
                console.error('Error closing Redis connection:', error.message);
            }
        }

        if (this.memoryMode) {
            this.jobQueue = [];
            this.jobData.clear();
            console.log('In-memory queue cleared');
        }
    }
}

module.exports = QueueManager;