import { useEffect, useState } from "react";
import JobList from "./components/JobList.jsx";
import JobDetailsPanel from "./components/JobDetailsPanel.jsx";
import "./index.css";
import { fetchJobs, triggerJob } from "./api/jobsApi.js";

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [message, setMessage] = useState("");
  const [isTriggering, setIsTriggering] = useState(false);

  async function loadJobs() {
    setLoadingJobs(true);
    const data = await fetchJobs();
    setJobs(data);
    if (!selectedJobId && data.length > 0) {
      setSelectedJobId(data[0].id);
    }
    setLoadingJobs(false);
  }

  useEffect(() => {
    loadJobs();
    const interval = setInterval(loadJobs, 5000);
    return () => clearInterval(interval);
  }, []);

  async function handleTriggerJob() {
    setIsTriggering(true);
    setMessage("");
    await triggerJob();
    setMessage("Build triggered successfully!");
    await loadJobs();
    setIsTriggering(false);
  }

  const selectedJob = jobs.find((job) => job.id === selectedJobId) || null;

  return (
  <div className="app-root">
    <div className="bg-wave bg-wave-1"></div>
    <div className="bg-wave bg-wave-2"></div>

    <div className="app-content">
        <header className="page-header">
          <h1 className="page-title">MCP HUB DASHBOARD</h1>
          <p className="page-subtitle">
            Trigger builds and monitor job statuses & logs.
          </p>
        </header>

        <div className="dashboard-layout">
          <div className="dashboard-column">
            <JobList
              jobs={jobs}
              selectedJobId={selectedJobId}
              onSelectJob={setSelectedJobId}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
              onTriggerClick={handleTriggerJob}
              isTriggering={isTriggering}
              message={message}
            />
          </div>
          <div className="dashboard-column">
            <JobDetailsPanel job={selectedJob} isLoading={loadingJobs} />
          </div>
        </div>
      </div>
    </div>
  );
  
}


export default App;
