import StatusBadge from "./StatusBadge.jsx";
import LogsPanel from "./LogsPanel.jsx";

function JobDetailsPanel({ job, isLoading }) {
  if (isLoading) {
    return (
      <section className="job-details-section">
        <h2 className="section-title">Job Details</h2>
        <p>Loading job details...</p>
      </section>
    );
  }

  if (!job) {
    return (
      <section className="job-details-section">
        <h2 className="section-title">Job Details</h2>
        <p>Select a job from the list to view details.</p>
      </section>
    );
  }

  return (
    <section className="job-details-section">
      <h2 className="section-title">Job Details</h2>

      <div className="job-meta">
        <div>
          <span className="job-meta-label">Job ID</span>
          <div className="job-meta-value">{job.id}</div>
        </div>
        <div>
          <span className="job-meta-label">Status</span>
          <div className="job-meta-value">
            <StatusBadge status={job.status} />
          </div>
        </div>
        <div>
          <span className="job-meta-label">Created At</span>
          <div className="job-meta-value">{job.createdAt}</div>
        </div>
        <div>
          <span className="job-meta-label">Last Updated</span>
          <div className="job-meta-value">{job.updatedAt}</div>
        </div>
      </div>

      <LogsPanel logs={job.logs} />
    </section>
  );
}

export default JobDetailsPanel;
