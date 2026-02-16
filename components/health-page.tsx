"use client"

import { Activity, CheckCircle, AlertCircle, XCircle, Server, Database, Globe, Shield } from "lucide-react"

interface HealthPageProps {
    setCurrentPage: (page: "dashboard" | "jobs" | "job-detail" | "pipelines" | "agents" | "health") => void
}

export default function HealthPage({ setCurrentPage }: HealthPageProps) {
    const services = [
        {
            name: "API Gateway",
            icon: Globe,
            status: "healthy",
            uptime: "99.99%",
            latency: "23ms",
            errorRate: "0.01%",
            lastIncident: "14 days ago",
        },
        {
            name: "Job Scheduler",
            icon: Activity,
            status: "healthy",
            uptime: "99.95%",
            latency: "12ms",
            errorRate: "0.05%",
            lastIncident: "7 days ago",
        },
        {
            name: "Agent Controller",
            icon: Server,
            status: "healthy",
            uptime: "99.98%",
            latency: "8ms",
            errorRate: "0.02%",
            lastIncident: "21 days ago",
        },
        {
            name: "PostgreSQL",
            icon: Database,
            status: "warning",
            uptime: "99.80%",
            latency: "45ms",
            errorRate: "0.3%",
            lastIncident: "2 hours ago",
        },
        {
            name: "Redis Cache",
            icon: Database,
            status: "healthy",
            uptime: "99.99%",
            latency: "2ms",
            errorRate: "0.00%",
            lastIncident: "30 days ago",
        },
        {
            name: "Auth Service",
            icon: Shield,
            status: "healthy",
            uptime: "99.97%",
            latency: "34ms",
            errorRate: "0.04%",
            lastIncident: "10 days ago",
        },
    ]

    const systemMetrics = [
        { label: "CPU Usage", value: "42%", max: 100, current: 42, status: "ok" },
        { label: "Memory Usage", value: "78%", max: 100, current: 78, status: "warning" },
        { label: "Disk Usage", value: "56%", max: 100, current: 56, status: "ok" },
        { label: "Network I/O", value: "2.4 GB/s", max: 100, current: 24, status: "ok" },
    ]

    const recentIncidents = [
        { time: "2h ago", title: "PostgreSQL high connection count", severity: "warning", resolved: false },
        { time: "2 days ago", title: "API Gateway 502 spike", severity: "critical", resolved: true },
        { time: "7 days ago", title: "Job Scheduler queue backlog", severity: "warning", resolved: true },
        { time: "14 days ago", title: "API Gateway certificate renewal", severity: "info", resolved: true },
    ]

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "healthy":
                return <CheckCircle size={16} className="text-success" />
            case "warning":
                return <AlertCircle size={16} className="text-warning" />
            case "critical":
                return <XCircle size={16} className="text-destructive" />
            default:
                return null
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "healthy":
                return "bg-success/10 text-success"
            case "warning":
                return "bg-warning/10 text-warning"
            case "critical":
                return "bg-destructive/10 text-destructive"
            default:
                return ""
        }
    }

    const getBarColor = (status: string) => {
        switch (status) {
            case "ok":
                return "bg-success"
            case "warning":
                return "bg-warning"
            case "critical":
                return "bg-destructive"
            default:
                return "bg-accent"
        }
    }

    const getSeverityBadge = (severity: string) => {
        switch (severity) {
            case "critical":
                return "bg-destructive/10 text-destructive"
            case "warning":
                return "bg-warning/10 text-warning"
            case "info":
                return "bg-accent/10 text-accent"
            default:
                return ""
        }
    }

    const healthyCount = services.filter((s) => s.status === "healthy").length
    const totalCount = services.length

    return (
        <div className="p-8 space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-1">System Health</h2>
                <p className="text-muted-foreground text-sm">Monitor infrastructure and service health</p>
            </div>

            {/* Overall Status Banner */}
            <div className="rounded-lg border border-border bg-card p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <Activity size={24} className="text-success" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">System Operational</h3>
                    <p className="text-sm text-muted-foreground">{healthyCount}/{totalCount} services healthy • 1 warning</p>
                </div>
            </div>

            {/* Resource Utilization */}
            <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-semibold mb-6">Resource Utilization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {systemMetrics.map((metric) => (
                        <div key={metric.label}>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">{metric.label}</span>
                                <span className="text-sm text-muted-foreground">{metric.value}</span>
                            </div>
                            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${getBarColor(metric.status)} transition-all`}
                                    style={{ width: `${metric.current}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Services Grid */}
            <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-semibold mb-6">Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => (
                        <div
                            key={service.name}
                            className="rounded-lg border border-border bg-muted/20 p-4 hover:border-accent/50 transition-all"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <service.icon size={18} className="text-accent" />
                                    <h4 className="font-semibold text-sm">{service.name}</h4>
                                </div>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadge(service.status)}`}>
                                    {getStatusIcon(service.status)}
                                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="text-xs text-muted-foreground">Uptime</p>
                                    <p className="text-sm font-semibold">{service.uptime}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Latency</p>
                                    <p className="text-sm font-semibold">{service.latency}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Error Rate</p>
                                    <p className="text-sm font-semibold">{service.errorRate}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Last Incident</p>
                                    <p className="text-sm font-semibold">{service.lastIncident}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Incidents */}
            <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-semibold mb-6">Recent Incidents</h3>
                <div className="space-y-3">
                    {recentIncidents.map((incident, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50">
                            <div className="flex items-center gap-3">
                                {incident.severity === "critical" ? (
                                    <XCircle size={18} className="text-destructive" />
                                ) : incident.severity === "warning" ? (
                                    <AlertCircle size={18} className="text-warning" />
                                ) : (
                                    <CheckCircle size={18} className="text-accent" />
                                )}
                                <div>
                                    <p className="text-sm font-medium">{incident.title}</p>
                                    <p className="text-xs text-muted-foreground">{incident.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${getSeverityBadge(incident.severity)}`}>
                                    {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                                </span>
                                {incident.resolved ? (
                                    <span className="text-xs font-semibold px-2 py-1 rounded bg-success/10 text-success">Resolved</span>
                                ) : (
                                    <span className="text-xs font-semibold px-2 py-1 rounded bg-warning/10 text-warning">Active</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
