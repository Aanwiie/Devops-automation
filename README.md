````markdown
# 🐳 MCP Hub – DevOps Infrastructure & Containerization  
> 🧰 *Final Year Project — MCP-Driven Multi-Agent DevOps Orchestration Hub*  
> **Branch:** `devops` | **Role:** DevOps Engineer  
> **Institution:** Sister Nivedita University, Kolkata  
> **Mentor:** Dr. Arkaprsva Bhaduri Mondal  

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
````

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

| Service       | Port  | Status           | Description                    |
| ------------- | ----- | ---------------- | ------------------------------ |
| MongoDB       | 27017 | ✅ Ready          | Database for job & log storage |
| Redis         | 6379  | ✅ Ready          | Job queue management           |
| Backend API   | 5000  | ⏳ In Development | Job orchestration layer        |
| Agent Service | 4000  | ⏳ In Development | Build executor (Node.js)       |
| Frontend      | 3000  | ⏳ In Development | Dashboard for monitoring       |

---

## 🧠 Architecture (Conceptual Flow)

```mermaid
graph TD
  A[Frontend (React UI)] -->|HTTP API| B[Backend (Express)]
  B -->|Queue Jobs| C[(Redis Queue)]
  C -->|Consume Jobs| D[Agent Service (Worker)]
  B -->|Store Metadata| E[(MongoDB)]
  D -->|Send Logs & Status| B
  B -->|Expose Data| A
```

> Each service runs in its own container, communicating through a shared Docker network defined in `docker-compose.yml`.

---

## 🛠️ Docker Commands

```bash
# Start all services
docker compose up -d

# View all running containers
docker ps

# View logs for all services
docker compose logs

# View logs for a specific service
docker compose logs backend
docker compose logs agent
docker compose logs mongodb

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
└── README.md             # DevOps documentation
```

---

## 🌿 Branch Structure

| Branch          | Description                                 |
| --------------- | ------------------------------------------- |
| `main`          | Stable, production-ready code               |
| `backend`       | Backend API development                     |
| `agent-service` | Worker & build agent logic                  |
| `frontend`      | React dashboard development                 |
| `devops`        | Docker & infrastructure setup (this branch) |
| `docs`          | Testing, diagrams, and reporting            |

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

---

## 🔄 Collaboration Workflow

### For Developers

* Write your service code inside `backend/`, `agent-service/`, or `frontend/`.
* Each folder has its own `Dockerfile`.
* On merge, Docker Compose auto-builds and runs your container.

### Merge Flow

1. Work on your branch
2. Test locally with Docker
3. Create a Pull Request → `main`
4. DevOps validates container health before merge

---

## ❓ Troubleshooting

### Containers won't start

```bash
docker info
docker compose logs
```

### Port already in use

```bash
netstat -ano | findstr :5000
```

### Database/Redis not connecting

```bash
docker compose restart mongodb redis
docker compose ps
```

---

## 📚 References

* [Docker Documentation](https://docs.docker.com/)
* [Docker Compose Guide](https://docs.docker.com/compose/)
* [Redis Documentation](https://redis.io/docs/)
* [MongoDB Manual](https://www.mongodb.com/docs/manual/)
* [Node.js Docs](https://nodejs.org/en/docs)

```