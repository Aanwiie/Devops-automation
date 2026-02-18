require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const jobsRoute = require('../routes/jobs');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mcp_hub';

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'REDIS_URL'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName] && varName !== 'MONGO_URI');
if (missingEnvVars.length > 0 && process.env.NODE_ENV === 'production') {
  console.warn(`Warning: Missing environment variables: ${missingEnvVars.join(', ')}`);
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow inline scripts for dashboard
}));
app.use(cors());

// Body parsing middleware with size limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  const health = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  };
  res.status(health.mongodb === 'connected' ? 200 : 503).json(health);
});

// Serve dashboard static files
app.use('/', express.static(path.join(__dirname, '../public')));

// API routes
app.use('/', jobsRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    ok: false, 
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message 
  });
});

// MongoDB connection with better error handling
let server;

async function startServer() {
  try {
    // Connect to MongoDB with updated options
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✓ MongoDB connected');

    // Start Express server
    server = app.listen(PORT, () => {
      console.log(`✓ API server listening on port ${PORT}`);
      console.log(`  Dashboard: http://localhost:${PORT}`);
      console.log(`  Health: http://localhost:${PORT}/health`);
    });

  } catch (err) {
    console.error('✗ Failed to start server:', err);
    process.exit(1);
  }
}

// Graceful shutdown
async function shutdown(signal) {
  console.log(`\n${signal} received. Starting graceful shutdown...`);
  
  if (server) {
    server.close(() => {
      console.log('✓ HTTP server closed');
    });
  }

  try {
    await mongoose.connection.close();
    console.log('✓ MongoDB connection closed');
    process.exit(0);
  } catch (err) {
    console.error('✗ Error during shutdown:', err);
    process.exit(1);
  }
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

// Start the server
startServer();
