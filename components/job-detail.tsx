"use client"

import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import JobDetailHeader from "./job-detail-header"
import JobDetailTabs from "./job-detail-tabs"

interface JobDetailProps {
  setCurrentPage: (page: "jobs" | "dashboard") => void
}

export default function JobDetail({ setCurrentPage }: JobDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-8 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => setCurrentPage("jobs")}
        className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-4"
      >
        <ChevronLeft size={18} />
        <span className="text-sm font-medium">Back to Jobs</span>
      </button>

      {/* Header */}
      <JobDetailHeader />

      {/* Tabs */}
      <JobDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
