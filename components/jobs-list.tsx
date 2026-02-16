import { Search } from "lucide-react"
import JobsTable from "./jobs-table"

interface JobsListProps {
  setCurrentPage: (page: "job-detail") => void
}

export default function JobsList({ setCurrentPage }: JobsListProps) {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Jobs</h2>
        <p className="text-muted-foreground text-sm">Manage and monitor your job executions</p>
      </div>

      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 flex gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {/* Status Filter */}
          <select className="px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm">
            <option>All Status</option>
            <option>Running</option>
            <option>Succeeded</option>
            <option>Failed</option>
          </select>

          {/* Time Filter */}
          <select className="px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm">
            <option>Last 24h</option>
            <option>Last hour</option>
            <option>Last 7 days</option>
          </select>
        </div>

        {/* Trigger Button */}
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm whitespace-nowrap">
          + Trigger Job
        </button>
      </div>

      {/* Jobs Table */}
      <JobsTable setCurrentPage={setCurrentPage} />
    </div>
  )
}
