# 🌐 MCP Orchestration Hub

A **Multi-Agent DevOps Orchestration Hub** — a modern frontend dashboard for managing CI/CD pipelines, AI agents, jobs, and system health in real time.

Built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS 4**.

---

## ✨ Features

- **Landing Page** — Premium dark-themed landing with animated hero, feature showcase, architecture diagram, and CTAs
- **Dashboard** — Real-time metrics overview with job status charts, system health indicators, and activity feed
- **Pipelines** — CI/CD pipeline management with stage visualization, run history, and success rates
- **Agents** — AI agent monitoring with status tracking, resource usage, and capability details
- **System Health** — Service health monitoring with latency, uptime, and incident tracking
- **Jobs** — Job listing with detailed views including logs, events, artifacts, and AI reasoning tabs

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) (Radix UI) |
| Charts | [Recharts](https://recharts.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Font | [Geist](https://vercel.com/font) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Aanwiie/Devops-automation.git
cd Devops-automation

# Switch to the frontend dashboard branch
git checkout frontend-dashboard

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Theme variables & animations
│   ├── layout.tsx           # Root layout (dark mode, Geist font)
│   └── page.tsx             # Client-side page router
├── components/
│   ├── landing-page.tsx     # Landing page
│   ├── sidebar.tsx          # Navigation sidebar
│   ├── top-navbar.tsx       # Top navigation bar
│   ├── dashboard.tsx        # Dashboard overview
│   ├── pipelines-page.tsx   # Pipelines management
│   ├── agents-page.tsx      # Agent monitoring
│   ├── health-page.tsx      # System health
│   ├── jobs-list.tsx        # Jobs listing
│   ├── job-detail.tsx       # Job detail view
│   ├── tabs/                # Job detail tab panels
│   └── ui/                  # 57 shadcn/ui primitives
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
└── public/                  # Static assets
```

---

## 🎨 Design

- **Dark theme** with a custom oklch color palette
- **Primary** (blue) / **Accent** (teal) / **Success** (green) / **Warning** (amber) / **Destructive** (red)
- Consistent card-based layouts with hover glow effects
- CSS animations for the landing page (floating orbs, gradient text, fade-ins)
- Geist font family for a clean, modern feel

---

## 📄 License

This project is private.
