"use client"
import JobOverviewTab from "./tabs/job-overview-tab"
import JobLogsTab from "./tabs/job-logs-tab"
import JobReasoningTab from "./tabs/job-reasoning-tab"
import JobArtifactsTab from "./tabs/job-artifacts-tab"
import JobEventsTab from "./tabs/job-events-tab"

interface JobDetailTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function JobDetailTabs({ activeTab, setActiveTab }: JobDetailTabsProps) {
  const tabs = ["Overview", "Logs", "Agent Reasoning", "Artifacts", "Events"]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border flex gap-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-1 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.toLowerCase()
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "overview" && <JobOverviewTab />}
        {activeTab === "logs" && <JobLogsTab />}
        {activeTab === "agent reasoning" && <JobReasoningTab />}
        {activeTab === "artifacts" && <JobArtifactsTab />}
        {activeTab === "events" && <JobEventsTab />}
      </div>
    </div>
  )
}
