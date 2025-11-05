# 🐳 MCP Hub – DevOps Infrastructure & Containerization  
> 🧰 *Final Year Project — MCP-Driven Multi-Agent DevOps Orchestration Hub*  
> **Branch:** `devops` | **Role:** DevOps Engineer  

---

## 📘 Overview

This branch contains the **complete Docker and environment setup** for the *MCP Hub – Build Orchestration Platform*, a distributed system integrating **Node.js**, **Redis**, and **MongoDB** to simulate multi-agent CI/CD automation.

It defines reusable Dockerfiles for the backend, agent, and frontend services, and a unified `docker-compose.yml` for orchestration, networking, and persistent volumes.

---

## 🚀 Quick Start

### 🧩 Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running  
- [Git](https://git-scm.com/) installed  

---

### ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aanwiie/Devops-automation.git
   cd Devops-automation

2. **Switch to the DevOps branch**

   ```bash
   git checkout devops
   ```

3. **Run the setup script (Windows example)**

   ```bash
   scripts\setup.bat
   ```

4. **Configure environment variables (optional)**
   Edit `.env` using values from `.env.example`.

5. **Start all services**

   ```bash
   docker compose up -d
   ```

---

## 📦 Services

| Service       | Port  | Description                    |
| ------------- | ----- | ------------------------------ |
| MongoDB       | 27017 | Database for job & log storage |
| Redis         | 6379  | Job queue management           |
| Backend API   | 5000  | Job orchestration layer        |
| Agent Service | 4000  | Build executor (Node.js)       |
| Frontend      | 3000  | Dashboard for monitoring       |

---

## 🛠️ Docker Commands

```bash
# Start all services
docker compose up -d

# View all running containers
docker ps

# View logs for all services
docker compose logs

# Stop all services
docker compose down

# Rebuild and restart after code changes
docker compose up --build -d

# Remove containers & volumes (clean slate)
docker compose down -v
```

---

## 📁 Project Structure

```
Devops-automation/
├── backend/              # Backend API service (Express)
│   └── Dockerfile
├── agent-service/        # Agent execution service (Node.js worker)
│   └── Dockerfile
├── frontend/             # React dashboard
│   └── Dockerfile
├── scripts/              # Setup & utility scripts
│   └── setup.bat
├── docker-compose.yml    # Multi-container orchestration
├── .env.example          # Environment variable template
└── README.md             # DevOps documentation (this file)
```

---

## 🧪 Testing the Setup

After starting services:

```bash
# Check MongoDB connection
docker exec -it mcp-mongodb mongosh -u admin -p password123

# Check Redis connection
docker exec -it mcp-redis redis-cli ping
```

Expected output:

```
MongoDB: connection successful
Redis: PONG
```

## 📚 References

* [Docker Documentation](https://docs.docker.com/)
* [Docker Compose Guide](https://docs.docker.com/compose/)
* [Redis Documentation](https://redis.io/docs/)
* [MongoDB Manual](https://www.mongodb.com/docs/manual/)
* [Node.js Docs](https://nodejs.org/en/docs)
