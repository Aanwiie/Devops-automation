export default function MetricCard({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10">
      <p className="text-sm text-muted-foreground mb-2">{title}</p>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className="text-xs text-muted-foreground">{change}</p>
    </div>
  )
}
