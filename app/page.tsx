"use client"

import { useState } from "react"
import TopNavbar from "@/components/top-navbar"
import Sidebar from "@/components/sidebar"
import Dashboard from "@/components/dashboard"
import JobsList from "@/components/jobs-list"
import JobDetail from "@/components/job-detail"
import PipelinesPage from "@/components/pipelines-page"
import AgentsPage from "@/components/agents-page"
import HealthPage from "@/components/health-page"

export type PageType = "dashboard" | "jobs" | "job-detail" | "pipelines" | "agents" | "health"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard")

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-auto">
          {currentPage === "dashboard" && <Dashboard setCurrentPage={setCurrentPage} />}
          {currentPage === "jobs" && <JobsList setCurrentPage={setCurrentPage} />}
          {currentPage === "job-detail" && <JobDetail setCurrentPage={setCurrentPage} />}
          {currentPage === "pipelines" && <PipelinesPage setCurrentPage={setCurrentPage} />}
          {currentPage === "agents" && <AgentsPage setCurrentPage={setCurrentPage} />}
          {currentPage === "health" && <HealthPage setCurrentPage={setCurrentPage} />}
        </main>
      </div>
    </div>
  )
}
