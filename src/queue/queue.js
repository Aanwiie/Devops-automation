const { Queue, QueueEvents } = require('bullmq');
const IORedis = require('ioredis');
require('dotenv').config();

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

const queueName = process.env.QUEUE_NAME || 'builds';
const queue = new Queue(queueName, { connection });
const queueEvents = new QueueEvents(queueName, { connection });

module.exports = { queue, queueEvents, connection };
