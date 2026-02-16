"use client"

import { LayoutDashboard, Zap, GitBranch, Cpu, Activity, Settings, Network } from "lucide-react"
import type { PageType } from "@/app/page"

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: PageType) => void
}

export default function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const menuItems: { icon: typeof LayoutDashboard; label: string; id: PageType }[] = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: Zap, label: "Jobs", id: "jobs" },
    { icon: GitBranch, label: "Pipelines", id: "pipelines" },
    { icon: Cpu, label: "Agents", id: "agents" },
    { icon: Activity, label: "System Health", id: "health" },
  ]

  return (
    <aside className="w-64 border-r border-border bg-sidebar text-sidebar-foreground flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-sidebar-primary/20 border border-sidebar-primary flex items-center justify-center">
          <Network size={20} className="text-sidebar-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-sm">MCP Hub</h2>
          <p className="text-xs text-muted-foreground">Orchestration</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${currentPage === item.id
                ? "bg-sidebar-primary/20 text-sidebar-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent/10"
              }`}
          >
            <item.icon size={18} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Settings */}
      <div className="border-t border-sidebar-border p-4">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/10 transition-colors">
          <Settings size={18} />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>
    </aside>
  )
}

