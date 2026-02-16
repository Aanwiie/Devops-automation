import { AlertCircle } from "lucide-react"

export default function JobDetailHeader() {
  return (
    <div className="space-y-6">
      {/* Title and Status */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">#1243 – Deploy service-x to staging</h1>
          <p className="text-muted-foreground">Started at 2024-01-23 10:20:00</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive font-semibold">
          <AlertCircle size={18} />
          <span>Failed</span>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground mb-1">Pipeline</p>
          <p className="font-semibold">service-x-ci</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground mb-1">Agent</p>
          <p className="font-semibold">deploy-bot</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground mb-1">Environment</p>
          <p className="font-semibold">staging</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground mb-1">Triggered by</p>
          <p className="font-semibold">agent: planner-bot</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground mb-1">Started</p>
          <p className="font-semibold">10:20:00 AM</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground mb-1">Duration</p>
          <p className="font-semibold">12m 05s</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground mb-1">Status</p>
          <p className="font-semibold text-destructive">Failed</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground mb-1">Finished</p>
          <p className="font-semibold">10:32:05 AM</p>
        </div>
      </div>
    </div>
  )
}
