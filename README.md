# MCP Hub Prototype: Build Orchestration & Monitoring

A simplified build orchestration and monitoring system inspired by CI/CD
and MCP (Model Context Protocol) concepts.\
It enables users to trigger builds, manage job queues, and visualize
real-time logs and statuses via a modern web dashboard.

This project serves as a Final-Year Team Project showcasing system
orchestration, backend--frontend integration, and distributed service
communication using **Node.js, Redis, and MongoDB**.

------------------------------------------------------------------------

## ✨ Overview

  -----------------------------------------------------------------------
  Icon            Feature                Description
  --------------- ---------------------- --------------------------------
  🎬              **Job Orchestration**  Trigger and manage build
                                         execution via an Express-based
                                         REST API.

  🚦              **Reliable Queuing**   Uses Redis + BullMQ for robust
                                         job scheduling and delivery.

  ⚙️              **Distributed          A dedicated Node.js Agent
                  Execution**            Service executes simulated build
                                         tasks.

  📊              **Real-Time            Track job lifecycle: Queued →
                  Monitoring**           Running → Completed/Failed via
                                         the dashboard.

  📦              **Dockerized           Deploy all services seamlessly
                  Environment**          with Docker Compose.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 🏛️ System Architecture

The architecture follows a decoupled microservices approach -- ensuring
scalability and clear separation of concerns through a shared Redis
queue and MongoDB persistence.

``` mermaid
graph TD
    A[Frontend (React)] -- POST /trigger --> B(Backend - Node.js/Express)
    B -- Enqueue Job --> C[Redis Queue]
    B -- Persist Metadata --> D[(MongoDB)]
    C -- Consume Task --> E[Agent Service - Node.js]
    E -- Run Simulated Build --> E
    E -- Status Updates --> B
    B -- Final Save --> D
    B -- GET /jobs --> A

    subgraph Core Data & Orchestration
        C
        D
    end

    subgraph Presentation & Control
        A
        B
    end
```

------------------------------------------------------------------------

## 🛠️ Tech Stack

  ------------------------------------------------------------------------------
  Layer         Component             Technology              Role
  ------------- --------------------- ----------------------- ------------------
  API / Control Backend               Node.js (Express)       API layer, job
                                                              creation,
                                                              orchestration

  Job           Queue                 Redis + BullMQ          High‑performance
  Management                                                  task scheduling

  Persistence   Database              MongoDB                 Stores job
                                                              metadata & logs

  Worker        Agent                 Node.js Microservice    Executes simulated
                                                              build tasks

  Interface     Frontend              React                   Dashboard for job
                                                              monitoring

  Deployment    Infrastructure        Docker Compose          Container
                                                              orchestration
  ------------------------------------------------------------------------------

------------------------------------------------------------------------

## 📂 Folder Structure

    mcp-hub/
    │
    ├── backend/
    │   ├── src/
    │   │   ├── routes/
    │   │   ├── models/
    │   │   ├── controllers/
    │   │   └── utils/
    │   ├── .env
    │   └── server.js
    │
    ├── agent/
    │   ├── src/
    │   │   └── agent.js
    │   ├── .env
    │   └── package.json
    │
    ├── frontend/
    │   ├── src/
    │   └── package.json
    │
    ├── docker-compose.yml
    └── README.md

------------------------------------------------------------------------

## ⚙️ Installation & Setup

### 🧩 Prerequisites

-   Node.js v18+
-   Docker & Docker Compose

### 1️⃣ Clone the Repository

    git clone https://github.com/<your-username>/mcp-hub.git
    cd mcp-hub

### 2️⃣ Configure Environment Variables

Create **backend/.env**

    PORT=5000
    MONGO_URI=mongodb://mongo:27017/mcp_hub
    REDIS_HOST=redis

Create **agent/.env**

    REDIS_HOST=redis
    BACKEND_URL=http://backend:5000

------------------------------------------------------------------------

### 3️⃣ Launch with Docker Compose (Recommended)

    docker-compose up --build -d

  Service    URL                     Port
  ---------- ----------------------- ------
  Frontend   http://localhost:3000   3000
  Backend    http://localhost:5000   5000

------------------------------------------------------------------------

### 4️⃣ Manual Run (Without Docker)

Backend:

    cd backend && npm install
    npm run dev

Agent:

    cd agent && npm install
    npm start

Frontend:

    cd frontend && npm install
    npm start

------------------------------------------------------------------------

### 🛑 Stop & Clean Up

    docker-compose down -v

------------------------------------------------------------------------

## 📞 API Endpoints

  Method   Endpoint    Description
  -------- ----------- -------------------------
  POST     /trigger    Trigger a new build job
  GET      /jobs       Fetch all job history
  GET      /jobs/:id   Fetch detailed job info

------------------------------------------------------------------------

## 🗓️ Team & Roadmap

**Team: NodeNerds**\
**Project Type: Final Year Project (November 2025)**

  Name       Role                 Focus
  ---------- -------------------- ------------------------
  Member 1   Backend Lead         API, Redis integration
  Member 2   Agent Engineer       Job execution system
  Member 3   Frontend Developer   React UI
  Member 4   DevOps               Docker, CI/CD
  Member 5   Documentation        QA & reporting

------------------------------------------------------------------------

## 🧭 Development Timeline

  Week   Goal                 Deliverable
  ------ -------------------- -------------------------
  1      Backend Foundation   Job queue + persistence
  2      Agent Integration    Worker execution
  3      Frontend Dashboard   Real‑time UI
  4      Finalization         Docker + error handling

------------------------------------------------------------------------

## 💡 Future Directions

-   Real CI/CD support with Docker‑in‑Docker\
-   WebSockets for live log streaming\
-   Multi‑agent parallel scaling\
-   Prometheus & Grafana observability\
-   Role‑based access control (RBAC)

------------------------------------------------------------------------

## 📄 License

MIT License\
Developed with ❤️ by **Team NodeNerds**, Final Year Project --- November
2025.
