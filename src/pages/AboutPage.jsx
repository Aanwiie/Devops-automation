// src/pages/AboutPage.jsx

export default function AboutPage() {
  return (
    <div className="app-content about-page">
        <header className="page-header">
        <h1 className="page-title">About</h1>
        <p className="page-subtitle">
          MCP-driven multi-agent DevOps automation — bridging AI agents and CI/CD
          pipelines into one coordinated system.
        </p>
      </header>

      {/* Problem Section */}
      <div className="job-list-section" style={{ marginBottom: "18px" }}>
        <h2 className="section-title">The Problem</h2>
        <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.7 }}>
          Modern development teams are starting to use AI agents for code
          generation, testing, analysis and operations. But traditional CI/CD
          tools were never designed to talk to these agents. There is no common
          protocol to coordinate AI + DevOps, handle multi-step, multi-modal
          workflows, or share context between tools in a reliable way.
        </p>
      </div>

      {/* Our Approach */}
      <div className="job-list-section" style={{ marginBottom: "18px" }}>
        <h2 className="section-title">Our Approach</h2>
        <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.7 }}>
          MCP Hub treats the <strong>Model Context Protocol (MCP)</strong> as a
          universal language between AI agents and DevOps platforms. The Hub
          acts as an orchestration layer that:
        </p>
        <ul style={{ marginTop: 8, fontSize: 14, lineHeight: 1.7 }}>
          <li>• Connects AI agents with CI/CD tools through a common protocol.</li>
          <li>• Coordinates jobs across different tools, clouds, and agents.</li>
          <li>• Streams logs and status updates into a single dashboard view.</li>
          <li>• Keeps a structured record of builds for debugging and analysis.</li>
        </ul>
      </div>

      {/* Architecture Summary */}
      <div className="job-list-section" style={{ marginBottom: "18px" }}>
        <h2 className="section-title">High-Level Architecture</h2>
        <ul style={{ marginTop: 8, fontSize: 14, lineHeight: 1.7 }}>
          <li>
            <strong>Backend (Node.js + Express):</strong> exposes REST APIs to
            trigger jobs, fetch status and logs.
          </li>
          <li>
            <strong>Queue (Redis + BullMQ):</strong> manages job scheduling and
            background processing.
          </li>
          <li>
            <strong>Database (MongoDB):</strong> stores job metadata, agent
            responses and log history.
          </li>
          <li>
            <strong>Agent Service:</strong> simulates MCP-style agents that pick
            up jobs, run tasks and send logs back.
          </li>
          <li>
            <strong>React Frontend:</strong> this MCP Hub dashboard for
            triggering, monitoring and inspecting builds.
          </li>
          <li>
            <strong>Docker / Docker Compose:</strong> makes the entire stack
            easy to run as a single environment.
          </li>
        </ul>
      </div>

      {/* Workflow Example */}
      <div className="job-list-section" style={{ marginBottom: "18px" }}>
        <h2 className="section-title">Example Workflow</h2>
        <ol style={{ marginTop: 8, fontSize: 14, lineHeight: 1.7, paddingLeft: 18 }}>
          <li>1. A user triggers a build from the MCP Hub dashboard.</li>
          <li>2. The backend creates a job and pushes it into the Redis queue.</li>
          <li>3. The agent service picks the job, simulates AI-driven tasks and execution.</li>
          <li>4. Logs and status updates are streamed back and stored in MongoDB.</li>
          <li>5. The dashboard shows live job status, history and detailed logs.</li>
        </ol>
      </div>
    </div>
  );
}
