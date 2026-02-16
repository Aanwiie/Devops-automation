"use client"

import { Cpu, CheckCircle, AlertCircle, XCircle, Activity, Zap } from "lucide-react"

interface AgentsPageProps {
    setCurrentPage: (page: "dashboard" | "jobs" | "job-detail" | "pipelines" | "agents" | "health") => void
}

export default function AgentsPage({ setCurrentPage }: AgentsPageProps) {
    const agents = [
        {
            name: "deploy-bot",
            description: "Handles all deployment operations",
            status: "online",
            type: "Deployment",
            jobsCompleted: 342,
            activeJobs: 1,
            uptime: "99.8%",
            lastActive: "Just now",
            cpu: "23%",
            memory: "512 MB",
        },
        {
            name: "test-runner",
            description: "Executes test suites across services",
            status: "online",
            type: "Testing",
            jobsCompleted: 218,
            activeJobs: 2,
            uptime: "99.5%",
            lastActive: "1 min ago",
            cpu: "45%",
            memory: "1.2 GB",
        },
        {
            name: "builder-agent",
            description: "Builds Docker images and artifacts",
            status: "online",
            type: "Build",
            jobsCompleted: 567,
            activeJobs: 0,
            uptime: "99.9%",
            lastActive: "5 min ago",
            cpu: "12%",
            memory: "768 MB",
        },
        {
            name: "db-agent",
            description: "Manages database migrations and backups",
            status: "warning",
            type: "Database",
            jobsCompleted: 89,
            activeJobs: 1,
            uptime: "98.2%",
            lastActive: "Just now",
            cpu: "67%",
            memory: "2.1 GB",
        },
        {
            name: "security-bot",
            description: "Runs security scans and vulnerability checks",
            status: "online",
            type: "Security",
            jobsCompleted: 134,
            activeJobs: 0,
            uptime: "99.7%",
            lastActive: "30 min ago",
            cpu: "8%",
            memory: "256 MB",
        },
        {
            name: "optimizer-v2",
            description: "Performance optimization and resource tuning",
            status: "offline",
            type: "Optimization",
            jobsCompleted: 23,
            activeJobs: 0,
            uptime: "87.3%",
            lastActive: "2h ago",
            cpu: "0%",
            memory: "0 MB",
        },
    ]

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "online":
                return <CheckCircle size={16} className="text-success" />
            case "warning":
                return <AlertCircle size={16} className="text-warning" />
            case "offline":
                return <XCircle size={16} className="text-destructive" />
            default:
                return null
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "online":
                return "bg-success/10 text-success"
            case "warning":
                return "bg-warning/10 text-warning"
            case "offline":
                return "bg-destructive/10 text-destructive"
            default:
                return ""
        }
    }

    const onlineCount = agents.filter((a) => a.status === "online").length
    const warningCount = agents.filter((a) => a.status === "warning").length
    const offlineCount = agents.filter((a) => a.status === "offline").length

    return (
        <div className="p-8 space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-1">Agents</h2>
                <p className="text-muted-foreground text-sm">Monitor and manage your orchestration agents</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border border-border bg-card p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <CheckCircle size={20} className="text-success" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{onlineCount}</p>
                        <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                </div>
                <div className="rounded-lg border border-border bg-card p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                        <AlertCircle size={20} className="text-warning" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{warningCount}</p>
                        <p className="text-xs text-muted-foreground">Warning</p>
                    </div>
                </div>
                <div className="rounded-lg border border-border bg-card p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                        <XCircle size={20} className="text-destructive" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{offlineCount}</p>
                        <p className="text-xs text-muted-foreground">Offline</p>
                    </div>
                </div>
            </div>

            {/* Agent Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {agents.map((agent) => (
                    <div
                        key={agent.name}
                        className="rounded-lg border border-border bg-card p-6 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                                    <Cpu size={18} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{agent.name}</h3>
                                    <p className="text-xs text-muted-foreground">{agent.description}</p>
                                </div>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(agent.status)}`}>
                                {getStatusIcon(agent.status)}
                                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                            </span>
                        </div>

                        {/* Type & Activity Badge */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs px-2 py-1 rounded bg-muted/50 text-muted-foreground font-medium">{agent.type}</span>
                            {agent.activeJobs > 0 && (
                                <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent font-medium flex items-center gap-1">
                                    <Zap size={12} />
                                    {agent.activeJobs} active job{agent.activeJobs > 1 ? "s" : ""}
                                </span>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                            <div>
                                <p className="text-xs text-muted-foreground">Jobs Completed</p>
                                <p className="text-sm font-semibold">{agent.jobsCompleted}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Uptime</p>
                                <p className="text-sm font-semibold">{agent.uptime}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">CPU / Memory</p>
                                <p className="text-sm font-semibold">{agent.cpu} / {agent.memory}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Last Active</p>
                                <p className="text-sm font-semibold">{agent.lastActive}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
