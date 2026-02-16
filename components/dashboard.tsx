import MetricCard from "./metric-card"
import RecentActivity from "./recent-activity"
import JobStatusChart from "./job-status-chart"
import SystemHealth from "./system-health"

interface DashboardProps {
  setCurrentPage: (page: "dashboard" | "jobs" | "job-detail") => void
}

export default function Dashboard({ setCurrentPage }: DashboardProps) {
  const metrics = [
    { title: "Total Jobs Today", value: "50", change: "+8% vs yesterday" },
    { title: "Running Jobs", value: "5", change: "2 queued" },
    { title: "Failed (24h)", value: "2", change: "-2 from yesterday" },
    { title: "Average Duration", value: "6m 32s", change: "+45s vs avg" },
    { title: "Active Agents", value: "4", change: "All healthy" },
    { title: "Queue Depth", value: "5", change: "Processing..." },
  ]

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-1">Dashboard</h2>
        <p className="text-muted-foreground text-sm">Real-time overview of your orchestration hub</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => (
          <MetricCard key={idx} {...metric} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <JobStatusChart />
        <SystemHealth />
      </div>

      {/* Recent Activity */}
      <RecentActivity setCurrentPage={setCurrentPage} />
    </div>
  )
}
