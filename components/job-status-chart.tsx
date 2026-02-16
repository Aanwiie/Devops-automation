export default function JobStatusChart() {
  const statuses = [
    { name: "Success", percentage: 70, color: "bg-success" },
    { name: "Running", percentage: 15, color: "bg-accent" },
    { name: "Failed", percentage: 10, color: "bg-destructive" },
    { name: "Pending", percentage: 5, color: "bg-warning" },
  ]

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold mb-6">Job Status Breakdown</h3>

      {/* Simple donut visualization with bars */}
      <div className="space-y-4">
        {statuses.map((status) => (
          <div key={status.name}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{status.name}</span>
              <span className="text-sm text-muted-foreground">{status.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full ${status.color}`} style={{ width: `${status.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Total Jobs</p>
            <p className="text-lg font-bold">847</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Success Rate</p>
            <p className="text-lg font-bold">94.2%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
