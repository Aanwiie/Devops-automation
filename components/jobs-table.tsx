"use client"

import { ChevronRight } from "lucide-react"

interface JobsTableProps {
  setCurrentPage: (page: "job-detail") => void
}

export default function JobsTable({ setCurrentPage }: JobsTableProps) {
  const jobs = [
    {
      id: "#1245",
      name: "Deploy service-x",
      pipeline: "service-x-ci",
      agent: "deploy-bot",
      environment: "production",
      startedAt: "2024-01-23 10:45:00",
      duration: "3m 24s",
      status: "Succeeded",
      statusColor: "text-success",
      bgColor: "bg-success/10",
    },
    {
      id: "#1244",
      name: "Run test suite",
      pipeline: "main-tests",
      agent: "test-runner",
      environment: "staging",
      startedAt: "2024-01-23 10:35:00",
      duration: "5m 12s",
      status: "Succeeded",
      statusColor: "text-success",
      bgColor: "bg-success/10",
    },
    {
      id: "#1243",
      name: "Deploy service-x",
      pipeline: "service-x-ci",
      agent: "deploy-bot",
      environment: "staging",
      startedAt: "2024-01-23 10:20:00",
      duration: "12m 05s",
      status: "Failed",
      statusColor: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      id: "#1242",
      name: "Build image",
      pipeline: "build-pipeline",
      agent: "builder-agent",
      environment: "staging",
      startedAt: "2024-01-23 10:10:00",
      duration: "8m 45s",
      status: "Succeeded",
      statusColor: "text-success",
      bgColor: "bg-success/10",
    },
    {
      id: "#1241",
      name: "Database migration",
      pipeline: "db-migrate",
      agent: "db-agent",
      environment: "production",
      startedAt: "2024-01-23 09:55:00",
      duration: "2m 30s",
      status: "Running",
      statusColor: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      id: "#1240",
      name: "Security scan",
      pipeline: "security-checks",
      agent: "security-bot",
      environment: "staging",
      startedAt: "2024-01-23 09:45:00",
      duration: "6m 15s",
      status: "Succeeded",
      statusColor: "text-success",
      bgColor: "bg-success/10",
    },
    {
      id: "#1239",
      name: "Deploy API",
      pipeline: "api-deploy",
      agent: "deploy-bot",
      environment: "staging",
      startedAt: "2024-01-23 09:30:00",
      duration: "4m 50s",
      status: "Succeeded",
      statusColor: "text-success",
      bgColor: "bg-success/10",
    },
    {
      id: "#1238",
      name: "Backup data",
      pipeline: "backup-job",
      agent: "backup-agent",
      environment: "production",
      startedAt: "2024-01-23 09:15:00",
      duration: "15m 30s",
      status: "Succeeded",
      statusColor: "text-success",
      bgColor: "bg-success/10",
    },
  ]

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Job ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Job Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Agent</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Environment</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Started At</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, idx) => (
              <tr
                key={idx}
                className="border-b border-border hover:bg-muted/20 transition-colors cursor-pointer"
                onClick={() => setCurrentPage("job-detail")}
              >
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${job.bgColor} ${job.statusColor}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-foreground">{job.id}</td>
                <td className="px-6 py-4 text-sm text-foreground">{job.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{job.agent}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{job.environment}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{job.startedAt}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{job.duration}</td>
                <td className="px-6 py-4 text-right">
                  <ChevronRight size={18} className="text-muted-foreground" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
