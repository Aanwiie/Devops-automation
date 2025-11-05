 🚀 MCP Hub Prototype: Build Orchestration & Monitoring

A simplified **build orchestration and monitoring system** inspired by **CI/CD** and **MCP (Model Context Protocol)** concepts.
It enables users to trigger builds, manage job queues, and visualize real-time logs and statuses via a modern web dashboard.

This project serves as a **Final-Year Team Project** showcasing system orchestration, backend–frontend integration, and distributed service communication using **Node.js**, **Redis**, and **MongoDB**.

---

## ✨ Overview

| Icon | Feature                    | Description                                                                   |
| :--: | :------------------------- | :---------------------------------------------------------------------------- |
|  🎬  | **Job Orchestration**      | Trigger and manage build execution via an Express-based REST API.             |
|  🚦  | **Reliable Queuing**       | Uses **Redis + BullMQ** for robust job scheduling and delivery.               |
|  ⚙️  | **Distributed Execution**  | A dedicated Node.js **Agent Service** executes simulated build tasks.         |
|  📊  | **Real-Time Monitoring**   | Track job lifecycle: *Queued → Running → Completed/Failed* via the dashboard. |
|  📦  | **Dockerized Environment** | Deploy all services seamlessly with **Docker Compose**.                       |

---

## 🏛️ System Architecture
(https://github.com/user-attachments/assets/a85c4e54-fc6b-4777-85c0-b6bae0597b7e)

The architecture follows a **decoupled microservices** approach — ensuring scalability and clear separation of concerns through a shared **Redis queue** and **MongoDB persistence**.
%% MCP Hub System Architecture Diagram
graph TD

    %% --- Presentation & Control Layer ---
    subgraph Presentation_&_Control
        A[Frontend (React Dashboard)]
        B[Backend (Node.js / Express API)]
    end

    %% --- Core Data & Orchestration Layer ---
    subgraph Core_Data_&_Orchestration
        C[(Redis Queue)]
        D[(MongoDB Database)]
    end

    %% --- Agent / Worker Layer ---
    E[Agent Service (Node.js Worker)]

    %% --- Flow Connections ---
    A -- "POST /trigger" --> B
    B -- "Enqueue Job" --> C
    B -- "Persist Initial Data" --> D
    C -- "Consume Job Task" --> E
    E -- "Execute Simulated Build" --> E
    E -- "Status & Log Updates" --> B
    B -- "Final Save" --> D
    B -- "GET /jobs" --> A




## 🛠️ Tech Stack

| Layer              | Component      | Technology           | Role                                           |
| :----------------- | :------------- | :------------------- | :--------------------------------------------- |
| **API / Control**  | Backend        | Node.js (Express)    | API layer, job creation, and orchestration     |
| **Job Management** | Queue          | Redis + BullMQ       | High-performance, fault-tolerant job scheduler |
| **Persistence**    | Database       | MongoDB              | Stores job data, logs, and metadata            |
| **Worker**         | Agent          | Node.js Microservice | Executes simulated build tasks                 |
| **Interface**      | Frontend       | React                | Interactive dashboard for job monitoring       |
| **Deployment**     | Infrastructure | Docker Compose       | Multi-container orchestration setup            |

---

## 📂 Folder Structure

```
mcp-hub/
│
├── backend/                  # Node.js Express API and orchestration logic
│   ├── src/
│   │   ├── routes/           # REST API routes
│   │   ├── models/           # MongoDB schemas
│   │   ├── controllers/      # Core business logic
│   │   └── utils/            # Helper functions
│   ├── .env
│   └── server.js             # Backend entry point
│
├── agent/                    # Job execution service
│   ├── src/
│   │   └── agent.js          # Worker logic consuming jobs
│   ├── .env
│   └── package.json
│
├── frontend/                 # React dashboard UI
│   ├── src/
│   └── package.json
│
├── docker-compose.yml        # Multi-service container orchestration
└── README.md
```

---

## ⚙️ Installation & Setup

### 🧩 Prerequisites

Ensure the following are installed:

* Node.js **v18+**
* **Docker** & **Docker Compose**

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/mcp-hub.git
cd mcp-hub
```

---

### 2️⃣ Configure Environment Variables

Create `.env` files in the respective directories:

**`backend/.env`**

```bash
PORT=5000
MONGO_URI=mongodb://mongo:27017/mcp_hub
REDIS_HOST=redis
```

**`agent/.env`**

```bash
REDIS_HOST=redis
BACKEND_URL=http://backend:5000
```

---

### 3️⃣ Launch with Docker Compose (Recommended)

Build and start all services:

```bash
docker-compose up --build -d
```

| Service            | Host URL                                       | Port |
| :----------------- | :--------------------------------------------- | :--- |
| Frontend Dashboard | [http://localhost:3000](http://localhost:3000) | 3000 |
| Backend API        | [http://localhost:5000](http://localhost:5000) | 5000 |

---

### 4️⃣ Manual Run (Without Docker)

If MongoDB and Redis are running locally:

```bash
# Backend
cd backend && npm install
npm run dev

# Agent
cd agent && npm install
npm start

# Frontend
cd frontend && npm install
npm start
```

---

### 🛑 Stop & Clean Up

```bash
docker-compose down -v
```

> The `-v` flag removes MongoDB volumes for a fresh start next time.

---

## 📞 API Endpoints

|  Method  | Endpoint    | Description                          |
| :------: | :---------- | :----------------------------------- |
| **POST** | `/trigger`  | Triggers a new simulated build job   |
|  **GET** | `/jobs`     | Fetches all job history and metadata |
|  **GET** | `/jobs/:id` | Retrieves detailed job info and logs |

---

## 🗓️ Team & Roadmap

**Team:** *NodeNerds*
**Project Type:** Final Year Project (November 2025)

| Name     | Role                 | Focus Area                                   |
| :------- | :------------------- | :------------------------------------------- |
| Sneha   | Backend Lead         | Node.js API, orchestration, Redis integration |
| Eshita  | Agent Engineer       | Job execution, status updates                 |
| Aditi   | Frontend Developer   | React UI, API integration                     |
| Mouli   | DevOps & Integration | Docker, CI/CD setup                           |
| Anwesha | Documentation & QA   | Testing, documentation, reporting             |

---

### 🧭 Development Timeline

| Week | Goal               | Deliverable                                    |
| :--: | :----------------- | :--------------------------------------------- |
|   1  | Backend Foundation | Job queuing and persistence system             |
|   2  | Agent Integration  | Worker consumes and updates job status         |
|   3  | Frontend Dashboard | Real-time job tracking and trigger UI          |
|   4  | Finalization       | Docker setup, error handling, demo-ready build |

---

## 💡 Future Directions

* 🧰 **Real CI/CD Support** — Implement Docker-in-Docker for actual build runs
* 🔴 **Live Logs** — Use WebSockets for live streaming build output
* ⚡ **Scalability** — Add load balancing and multi-agent parallelism
* 📈 **Observability** — Integrate Prometheus & Grafana for monitoring
* 🔐 **Access Control** — Role-based authentication (RBAC)

---

## 📄 License

This project is licensed under the **MIT License**.
Developed with ❤️ by **Team NodeNerds** — Final Year Project, November 2025.

---

