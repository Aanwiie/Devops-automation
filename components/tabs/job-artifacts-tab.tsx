import { Download, File } from "lucide-react"

export default function JobArtifactsTab() {
  const artifacts = [
    { name: "deployment-manifest.yaml", size: "2.4 KB" },
    { name: "build-output-v2.1.0.tar.gz", size: "45.3 MB" },
    { name: "health-check-report.json", size: "1.8 KB" },
    { name: "test-results.xml", size: "56.2 KB" },
    { name: "service-config.json", size: "3.1 KB" },
  ]

  return (
    <div className="space-y-3">
      {artifacts.map((artifact, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-border bg-card p-4 flex items-center justify-between hover:border-accent/50 transition-all"
        >
          <div className="flex items-center gap-3">
            <File size={20} className="text-accent" />
            <div>
              <p className="font-medium text-sm">{artifact.name}</p>
              <p className="text-xs text-muted-foreground">{artifact.size}</p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Download size={18} className="text-accent" />
          </button>
        </div>
      ))}
    </div>
  )
}
