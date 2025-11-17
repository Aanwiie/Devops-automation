// Dummy jobs data 
let dummyJobs = [
  {
    id: "JOB-001",
    status: "success",
    createdAt: "2025-11-17 10:00",
    updatedAt: "2025-11-17 10:05",
    logs: [
      "[10:00] Build started...",
      "[10:01] Installing dependencies...",
      "[10:03] Running tests...",
      "[10:05] Build completed successfully ✅",
    ],
  },
  {
    id: "JOB-002",
    status: "running",
    createdAt: "2025-11-17 10:10",
    updatedAt: "2025-11-17 10:12",
    logs: [
      "[10:10] Build started...",
      "[10:11] Fetching source code...",
      "[10:12] Running build steps...",
    ],
  },
  {
    id: "JOB-003",
    status: "failed",
    createdAt: "2025-11-17 09:30",
    updatedAt: "2025-11-17 09:35",
    logs: [
      "[09:30] Build started...",
      "[09:32] Installing dependencies...",
      "[09:34] Tests failed ❌",
      "[09:35] Build failed.",
    ],
  },
];

export async function fetchJobs() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return dummyJobs;
}

export async function fetchJobById(id) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const job = dummyJobs.find((j) => j.id === id);
  if (!job) throw new Error("Job not found");
  return job;
}

export async function triggerJob() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newIdNumber = dummyJobs.length + 1;
  const newJob = {
    id: `JOB-00${newIdNumber}`,
    status: "queued",
    createdAt: "2025-11-17 11:00",
    updatedAt: "2025-11-17 11:00",
    logs: ["[11:00] Job queued..."],
  };
  dummyJobs = [newJob, ...dummyJobs];
  return newJob;
}
