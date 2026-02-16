import { Settings, Moon, Bell } from "lucide-react"

export default function TopNavbar() {
  return (
    <nav className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">MCP Orchestration Hub</h1>
        <div className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">Staging</div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell size={18} className="text-muted-foreground" />
        </button>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Moon size={18} className="text-muted-foreground" />
        </button>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Settings size={18} className="text-muted-foreground" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
          <span className="text-sm font-semibold text-primary">JD</span>
        </div>
      </div>
    </nav>
  )
}
