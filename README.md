# Devops-automation
Here is a concise, one-liner description of your project:  **MCP Hub is a fully containerized, full-stack prototype utilizing Node.js, Redis, and MongoDB to orchestrate, execute, persist, and visualize simulated software build jobs via a React dashboard.**
MCP Hub Prototype
Overview

MCP Hub is a simplified prototype of a build orchestration and monitoring system inspired by CI/CD and MCP (Model Context Protocol) concepts.
It allows users to trigger builds, manage job queues, and visualize logs and build statuses in real time through a web dashboard.

This project is designed as a final-year team project focusing on system orchestration, backend-frontend integration, and distributed service communication using Node.js, Redis, and MongoDB.

Core Features

Trigger Build Jobs – Start simulated build processes through the backend API or UI.

Queue Management – Manage build execution using Redis and BullMQ for job scheduling.

Simulated Agent Execution – A Node.js agent fetches queued jobs and executes simulated build commands.

Real-time Status Updates – Track job progress (Queued → Running → Completed/Failed).

Dashboard UI – Simple React dashboard to monitor all builds, statuses, and logs.

Dockerized Environment – Fully containerized setup using Docker Compose.

System Architecture
                   ┌──────────────────┐
                   │     Frontend     │
                   │  (React/Next.js) │
                   └───────▲──────────┘
                           │ REST API
                           ▼
                   ┌──────────────────┐
                   │     Backend      │
                   │ (Node.js + Exp.) │
                   │  API + Orchestration │
                   └───────┬──────────┘
                           │
            ┌──────────────┼──────────────┐
            │                              │
            ▼                              ▼
   ┌──────────────────┐           ┌──────────────────┐
   │      Redis       │           │     MongoDB      │
   │ (Job Queue)      │           │ (Job Data, Logs) │
   └──────────────────┘           └──────────────────┘
            │
            ▼
   ┌──────────────────┐
   │      Agent       │
   │  (Node.js)       │
   │ Simulated Build  │
   └──────────────────┘

Tech Stack
Component	Technology	Purpose
Backend	Node.js + Express	API and job orchestration
Queue	Redis + BullMQ	Job scheduling and task management
Database	MongoDB	Persistent job data and logs
Agent	Node.js	Simulated build executor service
Frontend	React	Dashboard UI for visualization
Deployment	Docker + Docker Compose	Containerized multi-service setup
Folder Structure
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
├── README.md
└── docs/
    ├── architecture-diagram.png
    └── project-report.md

    ![WhatsApp Image 2025-11-05 at 20 09 38_29a41b64](https://github.com/user-attachments/assets/79176782-3412-4098-8bcc-5e6c168b6bad)

Installation & Setup
Prerequisites

Node.js (v18+)

Docker & Docker Compose

MongoDB and Redis (installed locally or via Docker)

1. Clone the Repository
git clone https://github.com/<your-username>/mcp-hub.git
cd mcp-hub

2. Environment Setup

Create .env files for backend and agent:

backend/.env

PORT=5000
MONGO_URI=mongodb://mongo:27017/mcp_hub
REDIS_HOST=redis


agent/.env

REDIS_HOST=redis
BACKEND_URL=http://backend:5000

3. Run with Docker
docker-compose up --build


This will start:

Backend (Node.js)

Agent service

MongoDB

Redis

Frontend (React)

The app should be available at:

Frontend: http://localhost:3000

Backend API: http://localhost:5000

4. Manual Run (Without Docker)

If you prefer to run services manually:

Backend

cd backend
npm install
npm run dev


Agent

cd agent
npm install
npm start


Frontend

cd frontend
npm install

npm start

API Endpoints
Method	Endpoint	Description
POST	/trigger	Trigger a new simulated build job
GET	/jobs	List all jobs
GET	/jobs/:id	Fetch details and logs for a specific job
Team Members & Roles
Name	Role	Responsibilities
Member 1	Backend Lead	Node.js APIs, job orchestration, Redis integration
Member 2	Agent Engineer	Agent development, job execution, status updates
Member 3	Frontend Developer	React dashboard, API integration, UI design
Member 4	DevOps & Integration	Docker setup, environment management, CI/CD
Member 5	Documentation & QA	Testing, documentation, diagrams, presentation
Development Roadmap
Week 1: Backend Setup

Initialize backend and setup MongoDB + Redis

Implement APIs for triggering and tracking jobs

Week 2: Agent Service

Develop simulated agent service

Integrate job consumption and status updates

Week 3: Frontend Dashboard

Build React dashboard for jobs, logs, and triggering builds

Week 4: Integration & Finalization

Docker Compose setup

Error handling, authentication, final testing, and demo prep

Future Enhancements

Real build execution via Docker containers

WebSocket-based live log streaming

Multi-agent support for distributed builds

Role-based access control

Metrics dashboard using Prometheus + Grafana

License

This project is licensed under the MIT License
.

Contributors

Developed by Team NodeNerds
Final Year Project — November 2025
