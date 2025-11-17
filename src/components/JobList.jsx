import React from "react";
import StatusBadge from "./StatusBadge.jsx";

function JobList({
  jobs,
  selectedJobId,
  onSelectJob,
  filterStatus,
  onFilterChange,
  onTriggerClick,
  isTriggering,
  message,
}) {
  const visibleJobs =
    filterStatus === "all"
      ? jobs
      : jobs.filter((job) => job.status === filterStatus);

  return (
    <section className="job-list-section">
      <div className="job-list-header">
        <h2 className="section-title">Jobs</h2>

        <div className="job-list-actions">
          <select
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value)}
            className="status-filter"
          >
            <option value="all">All statuses</option>
            <option value="queued">Queued</option>
            <option value="running">Running</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>

          <button
            className="primary-button"
            onClick={onTriggerClick}
            disabled={isTriggering}
          >
            {isTriggering ? "Triggering..." : "Trigger Build"}
          </button>
        </div>
      </div>

      {message && <p className="info-message">{message}</p>}

      {visibleJobs.length === 0 ? (
        <p className="empty-state">No jobs found. Trigger a build to start.</p>
      ) : (
        <div className="table-wrapper">
          <table className="job-table">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {visibleJobs.map((job) => (
                <tr
                  key={job.id}
                  className={
                    job.id === selectedJobId
                      ? "job-row job-row-selected"
                      : "job-row"
                  }
                  onClick={() => onSelectJob(job.id)}
                >
                  <td>{job.id}</td>
                  <td>
                    <StatusBadge status={job.status} />
                  </td>
                  <td>{job.createdAt}</td>
                  <td>{job.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default JobList;
