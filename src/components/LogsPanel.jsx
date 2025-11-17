import React from "react";

function LogsPanel({ logs }) {
  let content = "";

  if (Array.isArray(logs)) {
    content = logs.join("\n");
  } else if (typeof logs === "string") {
    content = logs;
  } else {
    content = "No logs available.";
  }

  return (
    <div className="logs-panel">
      <h3 className="section-subtitle">Logs</h3>
      <pre className="logs-content">{content}</pre>
    </div>
  );
}

export default LogsPanel;
