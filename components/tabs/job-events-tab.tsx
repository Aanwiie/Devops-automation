import { Clock } from "lucide-react"

export default function JobEventsTab() {
  const events = [
    { timestamp: "10:20:02", description: "Job execution started" },
    { timestamp: "10:20:15", description: "Image pull initiated" },
    { timestamp: "10:20:45", description: "Deployment resources created" },
    { timestamp: "10:21:00", description: "Waiting for pod startup" },
    { timestamp: "10:31:00", description: "Health check failed" },
    { timestamp: "10:31:05", description: "Deployment rollback initiated" },
    { timestamp: "10:32:05", description: "Job execution failed" },
  ]

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="space-y-4">
        {events.map((event, idx) => (
          <div key={idx} className="flex gap-4 pb-4 last:pb-0 last:border-b-0 border-b border-border/50">
            <div className="flex flex-col items-center">
              <Clock size={18} className="text-accent mt-1" />
              {idx < events.length - 1 && <div className="w-0.5 h-12 bg-border/50 my-2" />}
            </div>
            <div className="flex-1">
              <p className="font-mono text-sm text-accent font-semibold">{event.timestamp}</p>
              <p className="text-foreground text-sm">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
