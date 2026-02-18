const { Queue, QueueEvents } = require('bullmq');
const IORedis = require('ioredis');
require('dotenv').config();

// Redis connection with retry strategy
const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  reconnectOnError(err) {
    console.error('Redis connection error:', err.message);
    return true;
  }
});

// Connection event handlers
connection.on('connect', () => {
  console.log('✓ Redis connected');
});

connection.on('error', (err) => {
  console.error('✗ Redis error:', err.message);
});

connection.on('close', () => {
  console.log('✗ Redis connection closed');
});

const queueName = process.env.QUEUE_NAME || 'builds';

// Create queue with default options
const queue = new Queue(queueName, { 
  connection,
  defaultJobOptions: {
    removeOnComplete: { count: 1000, age: 24 * 3600 },
    removeOnFail: { count: 5000, age: 7 * 24 * 3600 },
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  }
});

// Queue events for monitoring
const queueEvents = new QueueEvents(queueName, { connection });

queueEvents.on('completed', ({ jobId }) => {
  console.log(`✓ Job ${jobId} completed`);
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.error(`✗ Job ${jobId} failed: ${failedReason}`);
});

// Graceful cleanup
async function closeQueue() {
  await queue.close();
  await queueEvents.close();
  await connection.quit();
  console.log('✓ Queue connections closed');
}

process.on('SIGTERM', closeQueue);
process.on('SIGINT', closeQueue);

module.exports = { queue, queueEvents, connection, closeQueue };
