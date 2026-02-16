"use client"

import { Activity, CheckCircle, AlertCircle, Zap } from "lucide-react"

interface RecentActivityProps {
  setCurrentPage: (page: "job-detail") => void
}

export default function RecentActivity({ setCurrentPage }: RecentActivityProps) {
  const activities = [
    { icon: CheckCircle, description: "Job #1245 completed successfully", time: "2 min ago", color: "text-success" },
    { icon: Zap, description: "Deploy agent triggered pipeline-x", time: "5 min ago", color: "text-accent" },
    {
      icon: AlertCircle,
      description: "Job #1243 failed - health check timeout",
      time: "12 min ago",
      color: "text-warning",
    },
    { icon: CheckCircle, description: "System backup completed", time: "1h ago", color: "text-success" },
    { icon: Zap, description: "New agent registered: optimizer-v2", time: "2h ago", color: "text-accent" },
  ]

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity size={20} className="text-accent" />
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </div>

      <div className="space-y-3">
        {activities.map((activity, idx) => (
          <button
            key={idx}
            onClick={() => idx === 2 && setCurrentPage("job-detail")}
            className="w-full text-left p-4 rounded-lg border border-transparent hover:border-border bg-muted/30 hover:bg-muted/60 transition-all flex items-start gap-3"
          >
            <activity.icon size={18} className={`flex-shrink-0 mt-0.5 ${activity.color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
