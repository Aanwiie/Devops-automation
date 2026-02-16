import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

export default function SystemHealth() {
  const healthItems = [
    { label: "API Latency", status: "ok", value: "45ms" },
    { label: "Error Rate", status: "ok", value: "0.2%" },
    { label: "Throughput", status: "ok", value: "12.5k req/s" },
    { label: "Memory Usage", status: "warning", value: "78%" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ok":
        return <CheckCircle size={16} className="text-success" />
      case "warning":
        return <AlertCircle size={16} className="text-warning" />
      case "critical":
        return <XCircle size={16} className="text-destructive" />
      default:
        return null
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "ok":
        return "bg-success/10 text-success"
      case "warning":
        return "bg-warning/10 text-warning"
      case "critical":
        return "bg-destructive/10 text-destructive"
      default:
        return ""
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold mb-6">System Health</h3>

      <div className="space-y-4">
        {healthItems.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              {getStatusIcon(item.status)}
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.value}</p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusBadgeColor(item.status)}`}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
