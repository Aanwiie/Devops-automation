"use client"

import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function JobReasoningTab() {
  const [expandedIdx, setExpandedIdx] = useState(0)

  const reasoningSteps = [
    {
      title: "Step 1 – Plan pipeline",
      details: [
        "Analyzed deployment requirements",
        "Selected deployment environment: staging",
        "Created pipeline with 4 stages",
      ],
    },
    {
      title: "Step 2 – Select environment",
      details: ["Environment: staging (GKE cluster)", "Region: us-central1", "Namespace: default"],
    },
    {
      title: "Step 3 – Apply deployment policy",
      details: ["Health check timeout: 120s", "Max replicas: 3", "Rolling update: enabled"],
    },
    {
      title: "Step 4 – Execute deployment",
      details: ["Deployed 3 replicas", "Health checks failed: pod startup timeout", "Initiated automatic rollback"],
    },
  ]

  return (
    <div className="space-y-3">
      {reasoningSteps.map((step, idx) => (
        <div key={idx} className="rounded-lg border border-border bg-card overflow-hidden">
          <button
            onClick={() => setExpandedIdx(expandedIdx === idx ? -1 : idx)}
            className="w-full flex items-center gap-3 px-6 py-4 hover:bg-muted/20 transition-colors"
          >
            {expandedIdx === idx ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            <span className="font-semibold flex-1 text-left">{step.title}</span>
          </button>

          {expandedIdx === idx && (
            <div className="border-t border-border px-6 py-4 bg-muted/10 space-y-2">
              {step.details.map((detail, detailIdx) => (
                <div key={detailIdx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <p className="text-sm text-foreground">{detail}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
