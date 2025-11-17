// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-inner">
        <div className="landing-tag">MCP-Driven Multi-Agent DevOps Automation</div>

        <h1 className="landing-title">
          Think. Build.<span> Deploy</span>
        </h1>

        <p className="landing-subtitle">
          This is a prototype orchestration layer that shows how the Model
          Context Protocol (MCP) can coordinate AI agents, build systems and
          infrastructure from one unified dashboard.
        </p>

        <div className="landing-buttons">
          <Link to="/" className="btn-primary">
            Open Dashboard
          </Link>
          <Link to="/about" className="btn-ghost">
            Learn about the architecture
          </Link>
        </div>

        <div className="landing-footnote">
            {/* Features Section */}
<div className="features-section">
  <h2 className="features-title">Explore Our Features</h2>

  <div className="features-grid">
    <div className="feature-card">
      <h3>🤖 MCP Agent Orchestration</h3>
      <p>Connect and coordinate multiple AI agents with standardized messaging.</p>
    </div>
    <div className="feature-card">
      <h3>🚀 Build Triggering</h3>
      <p>Launch builds directly from the dashboard with filtering and controls.</p>
    </div>
    <div className="feature-card">
      <h3>📡 Real-Time Logs</h3>
      <p>Stream live logs and execution output from agents and jobs.</p>
    </div>
    <div className="feature-card">
      <h3>📊 Job Monitoring</h3>
      <p>Track status, timestamps, metadata and failure points for every workflow.</p>
    </div>
    <div className="feature-card">
      <h3>🔗 Unified Protocol (MCP)</h3>
      <p>Standard interface for tools, agents, CI/CD services and data sources.</p>
    </div>
    <div className="feature-card">
      <h3>🐳 Dockerized Microservices</h3>
      <p>Portable environment with Redis queue, Node backend, MongoDB and agents.</p>
    </div>
  </div>
</div>

          Simulated multi-agent workflow · Redis queue · MongoDB logging ·
          Dockerized micro-services · React dashboard UI
        </div>
      </div>
    </div>
  );
}
