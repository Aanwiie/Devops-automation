const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { queue } = require('../queue/queue');
const { v4: uuidv4 } = require('uuid');

// POST /trigger - trigger new build
// body: { name, repo, commit, commands: ["npm install", "npm test"] }
router.post('/trigger', async (req, res) => {
  try {
    const { name, repo, commit, commands } = req.body;
    const jobDoc = new Job({
      name: name || `build-${Date.now()}`,
      repo: repo || null,
      commit: commit || null,
      commands: commands || ['echo "no commands"'],
      status: 'queued'
    });
    await jobDoc.save();

    // enqueue a job, passing mongodb jobId so worker can update document
    await queue.add('build', { jobId: jobDoc._id.toString() }, { removeOnComplete: 1000, removeOnFail: 1000 });

    res.status(201).json({ ok: true, id: jobDoc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /jobs - list all jobs (with paging)
router.get('/jobs', async (req, res) => {
  try {
    const page = Math.max(0, parseInt(req.query.page || '0'));
    const limit = Math.min(100, parseInt(req.query.limit || '20'));
    const jobs = await Job.find().sort({ createdAt: -1 }).skip(page * limit).limit(limit).lean().exec();
    res.json({ ok: true, jobs });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /jobs/:id - job details & logs
router.get('/jobs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.findById(id).exec();
    if (!job) return res.status(404).json({ ok: false, error: 'job not found' });
    res.json({ ok: true, job });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
