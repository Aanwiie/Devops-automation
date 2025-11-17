import React from "react";

function StatusBadge({ status }) {
  const normalized = status ? status.toLowerCase() : "unknown";

  let label = normalized.charAt(0).toUpperCase() + normalized.slice(1);
  if (normalized === "success") label = "Success";
  if (normalized === "failed") label = "Failed";
  if (normalized === "running") label = "Running";
  if (normalized === "queued") label = "Queued";

  return <span className={`status-badge status-${normalized}`}>{label}</span>;
}

export default StatusBadge;
