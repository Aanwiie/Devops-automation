# DevOps Automation Hub

A robust DevOps automation system built with Node.js, Express, BullMQ, MongoDB, and Redis. This system allows you to trigger, queue, and execute build jobs with real-time log streaming.

## ✨ Features

- **Job Queue System**: BullMQ-powered job queue with Redis
- **Real-time Dashboard**: Web interface for monitoring jobs and viewing logs
- **Command Execution**: Execute shell commands in a controlled environment
- **Job Management**: Create, list, view, and delete jobs via REST API
- **Rate Limiting**: API protection against abuse
- **Input Validation**: Joi-based request validation
- **Health Checks**: Built-in health monitoring endpoints
- **Graceful Shutdown**: Proper cleanup of connections and workers
- **Security**: Helmet.js middleware, input sanitization, resource limits
- **Docker Support**: Full containerization with docker-compose

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devops-automation
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Access the dashboard**
   Open http://localhost:3000 in your browser

4. **Check logs**
   ```bash
   docker-compose logs -f api
   docker-compose logs -f agent
   ```

### Manual Setup

1. **Prerequisites**
   - Node.js 18+
   - MongoDB 6+
   - Redis 7+

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start services**
   ```bash
   # Terminal 1 - API Server
   npm run start:api
   
   # Terminal 2 - Worker Agent
   npm run start:agent
   ```

## 📡 API Endpoints

### Health Check
```bash
GET /health
```

### Trigger New Job
```bash
POST /trigger
Content-Type: application/json

{
  "name": "my-build",
  "repo": "https://github.com/user/repo.git",
  "commit": "abc123",
  "commands": [
    "npm install",
    "npm test",
    "npm run build"
  ]
}
```

### List Jobs
```bash
GET /jobs?page=0&limit=20
```

### Get Job Details
```bash
GET /jobs/:id
```

### Delete Job
```bash
DELETE /jobs/:id
```

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | API server port |
| `NODE_ENV` | `production` | Environment mode |
| `MONGO_URI` | `mongodb://localhost:27017/devops_hub` | MongoDB connection string |
| `REDIS_URL` | `redis://localhost:6379` | Redis connection string |
| `QUEUE_NAME` | `builds` | BullMQ queue name |
| `MAX_CONCURRENT_JOBS` | `3` | Worker concurrency |
| `COMMAND_TIMEOUT` | `300000` | Command timeout (ms) |

## 🏗️ Architecture

```
┌─────────────┐      ┌─────────────┐
│   Browser   │─────▶│   API       │
│  Dashboard  │      │   Server    │
└─────────────┘      └──────┬──────┘
                            │
                     ┌──────▼──────┐
                     │   MongoDB   │
                     └──────┬──────┘
                            │
                     ┌──────▼──────┐
                     │    Redis    │
                     │  (BullMQ)   │
                     └──────┬──────┘
                            │
                     ┌──────▼──────┐
                     │   Worker    │
                     │   Agent     │
                     └─────────────┘
```

## 🔒 Security Features

- **Helmet.js**: Security headers
- **Rate Limiting**: Prevents API abuse (10 requests/minute for job creation)
- **Input Validation**: Joi schemas validate all inputs
- **Resource Limits**: Docker container resource constraints
- **Non-root User**: Containers run as non-root user
- **Command Timeout**: Prevents runaway processes
- **Log Size Limits**: Prevents memory exhaustion

### 🧪 Testing

### Test the API
```bash
# Create a test job
curl -X POST http://localhost:3000/trigger \
  -H "Content-Type: application/json" \
  -d '{
    "name": "test-job",
    "commands": ["echo Hello", "date"]
  }'

# List jobs
curl http://localhost:3000/jobs

# Get job details
curl http://localhost:3000/jobs/<job-id>

# Check health
curl http://localhost:3000/health
```

## 📝 Monitoring

### View Logs
```bash
# API logs
docker-compose logs -f api

# Worker logs
docker-compose logs -f agent

# All services
docker-compose logs -f
```

### Check Service Health
```bash
# API health
curl http://localhost:3000/health

# Redis
docker-compose exec redis redis-cli ping

# MongoDB
docker-compose exec mongo mongosh --eval "db.adminCommand('ping')"
```

## 🛠️ Development

### Run in Development Mode
```bash
npm run dev:api    # API with auto-reload
npm run dev:agent  # Worker with auto-reload
```

### Stop Services
```bash
docker-compose down

# Remove volumes (⚠️ deletes all data)
docker-compose down -v
```

## 📦 Production Deployment

1. **Set production environment variables**
2. **Use proper MongoDB and Redis instances**
3. **Enable authentication on MongoDB and Redis**
4. **Set up reverse proxy (nginx)**
5. **Configure SSL/TLS certificates**
6. **Set up monitoring and alerting**
7. **Regular backups of MongoDB**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review Docker logs for errors

## 🎯 Roadmap

- [ ] WebSocket support for real-time log streaming
- [ ] Job scheduling with cron expressions
- [ ] Multi-tenant support
- [ ] Job templates
- [ ] Slack/email notifications
- [ ] Metrics and analytics dashboard
- [ ] Job retry policies
- [ ] Artifact storage
