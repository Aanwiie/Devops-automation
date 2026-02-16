"use client"

import { GitBranch, CheckCircle, AlertCircle, Clock, Play } from "lucide-react"

interface PipelinesPageProps {
    setCurrentPage: (page: "dashboard" | "jobs" | "job-detail" | "pipelines" | "agents" | "health") => void
}

export default function PipelinesPage({ setCurrentPage }: PipelinesPageProps) {
    const pipelines = [
        {
            name: "service-x-ci",
            description: "CI/CD pipeline for service-x",
            lastRun: "2 min ago",
            status: "succeeded",
            runs: 124,
            successRate: "96%",
            stages: ["Checkout", "Build", "Test", "Deploy"],
        },
        {
            name: "main-tests",
            description: "Main test suite for all services",
            lastRun: "15 min ago",
            status: "succeeded",
            runs: 89,
            successRate: "98%",
            stages: ["Checkout", "Unit Tests", "Integration Tests"],
        },
        {
            name: "build-pipeline",
            description: "Docker image build pipeline",
            lastRun: "30 min ago",
            status: "running",
            runs: 203,
            successRate: "94%",
            stages: ["Checkout", "Build", "Push"],
        },
        {
            name: "db-migrate",
            description: "Database migration pipeline",
            lastRun: "1h ago",
            status: "failed",
            runs: 45,
            successRate: "91%",
            stages: ["Backup", "Migrate", "Verify"],
        },
        {
            name: "security-checks",
            description: "Security scanning pipeline",
            lastRun: "2h ago",
            status: "succeeded",
            runs: 67,
            successRate: "100%",
            stages: ["SAST", "DAST", "Dependency Scan"],
        },
        {
            name: "api-deploy",
            description: "API service deployment",
            lastRun: "3h ago",
            status: "succeeded",
            runs: 156,
            successRate: "97%",
            stages: ["Build", "Test", "Staging", "Production"],
        },
    ]

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "succeeded":
                return <CheckCircle size={16} className="text-success" />
            case "failed":
                return <AlertCircle size={16} className="text-destructive" />
            case "running":
                return <Clock size={16} className="text-accent animate-pulse" />
            default:
                return null
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "succeeded":
                return "bg-success/10 text-success"
            case "failed":
                return "bg-destructive/10 text-destructive"
            case "running":
                return "bg-accent/10 text-accent"
            default:
                return ""
        }
    }

    return (
        <div className="p-8 space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-1">Pipelines</h2>
                <p className="text-muted-foreground text-sm">Manage and monitor your CI/CD pipelines</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {pipelines.map((pipeline) => (
                    <div
                        key={pipeline.name}
                        className="rounded-lg border border-border bg-card p-6 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10 cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
                                    <GitBranch size={18} className="text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{pipeline.name}</h3>
                                    <p className="text-xs text-muted-foreground">{pipeline.description}</p>
                                </div>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(pipeline.status)}`}>
                                {getStatusIcon(pipeline.status)}
                                {pipeline.status.charAt(0).toUpperCase() + pipeline.status.slice(1)}
                            </span>
                        </div>

                        {/* Stages */}
                        <div className="flex items-center gap-2 mb-4">
                            {pipeline.stages.map((stage, idx) => (
                                <div key={stage} className="flex items-center gap-2">
                                    <span className="text-xs px-2 py-1 rounded bg-muted/50 text-muted-foreground font-medium">{stage}</span>
                                    {idx < pipeline.stages.length - 1 && <span className="text-muted-foreground/50">→</span>}
                                </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex gap-6">
                                <div>
                                    <p className="text-xs text-muted-foreground">Total Runs</p>
                                    <p className="text-sm font-semibold">{pipeline.runs}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Success Rate</p>
                                    <p className="text-sm font-semibold">{pipeline.successRate}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Last Run</p>
                                    <p className="text-sm font-semibold">{pipeline.lastRun}</p>
                                </div>
                            </div>
                            <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="Run pipeline">
                                <Play size={16} className="text-accent" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
