# Agent Service

A minimal Node.js Agent Service that simulates build job execution for MCP-like systems. The service receives job requests, executes commands, stores job status, and sends updates back to a central Hub.

## Features

- ✅ **RESTful API** - Submit jobs via POST /run, check status via GET /status/:jobId
- ✅ **Background Processing** - Asynchronous job execution with real command processing
- ✅ **Dual Storage** - Redis for production, automatic in-memory fallback for development
- ✅ **Real Command Execution** - Uses Node.js child_process to execute actual system commands
- ✅ **Hub Integration** - Sends job completion callbacks to MCP Hub
- ✅ **Comprehensive Logging** - Captures stdout, stderr, and execution metadata
- ✅ **Error Handling** - Graceful degradation and proper HTTP status codes
- ✅ **Zero Dependencies** - Works out-of-the-box without Redis for local testing

## Tech Stack

- **Node.js** + Express.js
- **Redis** (with in-memory fallback)
- **Axios** for HTTP callbacks
- **dotenv** for configuration

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The service will start on port 4000 with automatic Redis fallback
```

## API Endpoints

### Submit Job
```bash
POST /run
Content-Type: application/json

{
  "jobId": "unique-job-id",
  "command": "echo Hello World"
}

Response: {"jobId": "unique-job-id", "status": "queued"}
```

### Check Job Status
```bash
GET /status/:jobId

Response: {
  "jobId": "unique-job-id",
  "status": "completed",
  "logs": ["[stdout] Hello World", "[system] Process exited with code: 0"],
  "createdAt": "2025-11-05T15:01:45.607Z",
  "startedAt": "2025-11-05T15:01:45.637Z",
  "completedAt": "2025-11-05T15:01:45.666Z"
}
```

### Health Check
```bash
GET /health

Response: {
  "status": "ok",
  "timestamp": "2025-11-05T15:01:45.400Z",
  "queue": {"healthy": true, "mode": "memory"},
  "version": "1.0.0"
}
```

## Configuration

Environment variables (see `.env` file):

```bash
PORT=4000                                    # HTTP server port
REDIS_URL=redis://localhost:6379            # Redis connection (optional)
HUB_URL=http://localhost:3000/hub/update-status  # MCP Hub callback URL
JOB_TIMEOUT=300000                          # Job timeout in milliseconds
POLL_INTERVAL=1000                          # Queue polling interval
```

## Job Lifecycle

1. **Submit** - Job submitted via POST /run → status: "queued"
2. **Process** - Background worker picks up job → status: "running"  
3. **Execute** - Command executed via child_process → captures output
4. **Complete** - Job finishes → status: "completed" or "failed"
5. **Callback** - Hub notified of completion (if Hub URL configured)

## Development vs Production

**Development Mode (No Redis)**:
- Automatic in-memory storage fallback
- All functionality works identically
- Perfect for local testing and development

**Production Mode (With Redis)**:
- Persistent job storage
- Scalable across multiple instances
- Reliable job queue with Redis persistence

## Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   MCP Hub   │◄──►│Agent Service│◄──►│    Redis    │
└─────────────┘    └─────────────┘    └─────────────┘
                          │
                   ┌─────────────┐
                   │Child Process│
                   │  Commands   │
                   └─────────────┘
```

## Example Usage

```bash
# Submit a simple command
curl -X POST http://localhost:4000/run \
  -H "Content-Type: application/json" \
  -d '{"jobId": "test-1", "command": "echo Hello World"}'

# Check job status
curl http://localhost:4000/status/test-1

# Submit a Windows command
curl -X POST http://localhost:4000/run \
  -H "Content-Type: application/json" \
  -d '{"jobId": "test-2", "command": "dir"}'
```

## Project Structure

```
agent-service/
├── src/
│   ├── index.js          # Express server and main application
│   ├── queue.js          # Redis/memory queue management
│   └── worker.js         # Background job processor
├── .env                  # Environment configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## License

MIT License - Feel free to use this in your projects!