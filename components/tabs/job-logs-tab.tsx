import { Search } from "lucide-react"

export default function JobLogsTab() {
  const logs = [
    "[10:20:02] INFO Starting deploy to staging",
    "[10:20:15] INFO Pulling latest image: service-x:v2.1.0",
    "[10:20:45] INFO Creating deployment resources",
    "[10:21:10] WARN Pod startup taking longer than expected",
    "[10:21:30] WARN Waiting for health checks...",
    "[10:31:00] ERROR Health check failed for service-x",
    "[10:31:05] ERROR Readiness probe exceeded timeout (120s)",
    "[10:31:10] ERROR Rolling back deployment",
    "[10:31:45] INFO Deployment rolled back successfully",
    "[10:32:05] FATAL Job failed: Deploy stage",
  ]

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <select className="px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm">
          <option>All levels</option>
          <option>INFO</option>
          <option>WARN</option>
          <option>ERROR</option>
        </select>
        <div className="flex-1 relative w-full sm:w-auto">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search logs..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
          />
        </div>
        <button className="px-4 py-2 rounded-lg bg-input border border-border text-foreground hover:bg-muted/30 transition-colors text-sm whitespace-nowrap">
          Follow live
        </button>
      </div>

      {/* Logs Display */}
      <div className="rounded-lg border border-border bg-input p-6 font-mono text-sm">
        <div className="space-y-1">
          {logs.map((log, idx) => {
            let textColor = "text-muted-foreground"
            if (log.includes("INFO")) textColor = "text-accent"
            if (log.includes("WARN")) textColor = "text-warning"
            if (log.includes("ERROR") || log.includes("FATAL")) textColor = "text-destructive"

            return (
              <div key={idx} className={textColor}>
                {log}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
