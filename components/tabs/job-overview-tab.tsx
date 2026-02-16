import { CheckCircle, Circle, AlertCircle } from "lucide-react"

export default function JobOverviewTab() {
  const stages = [
    { name: "Checkout", status: "done" },
    { name: "Build", status: "done" },
    { name: "Test", status: "done" },
    { name: "Deploy", status: "failed" },
  ]

  const getStageIcon = (status: string) => {
    switch (status) {
      case "done":
        return <CheckCircle size={20} className="text-success" />
      case "failed":
        return <AlertCircle size={20} className="text-destructive" />
      case "in-progress":
        return <Circle size={20} className="text-accent animate-spin" />
      default:
        return <Circle size={20} className="text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Job Status Summary */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Execution Summary</h3>
        <p className="text-foreground mb-4">
          Job failed at stage <span className="font-semibold">Deploy</span> due to{" "}
          <span className="text-destructive font-semibold">health check timeout</span>.
        </p>
        <p className="text-sm text-muted-foreground">
          The service was unable to pass health checks within the configured timeout period. Check the logs for more
          details.
        </p>
      </div>

      {/* Pipeline Stages */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-semibold mb-6">Pipeline Stages</h3>
        <div className="space-y-4">
          {stages.map((stage, idx) => (
            <div key={idx} className="flex items-start gap-4">
              {getStageIcon(stage.status)}
              <div className="flex-1">
                <p className="font-medium">{stage.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stage.status === "done" && "Completed successfully"}
                  {stage.status === "failed" && "Failed with timeout"}
                  {stage.status === "in-progress" && "Currently running"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
