const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const Job = require('../models/Job');
const { queue } = require('../queue/queue');

// Rate limiting
const createJobLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: { ok: false, error: 'Too many job creation requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Input validation schemas
const triggerSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional(),
  repo: Joi.string().uri().max(500).optional().allow(null),
  commit: Joi.string().max(100).optional().allow(null),
  commands: Joi.array()
    .items(Joi.string().max(1000))
    .min(1)
    .max(50)
    .default(['echo "no commands"'])
});

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(0).default(0),
  limit: Joi.number().integer().min(1).max(100).default(20)
});

// POST /trigger - trigger new build
// body: { name, repo, commit, commands: ["npm install", "npm test"] }
router.post('/trigger', createJobLimiter, async (req, res) => {
  try {
    // Validate input
    const { error, value } = triggerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Validation error', 
        details: error.details.map(d => d.message)
      });
    }

    const { name, repo, commit, commands } = value;

    // Create job document
    const jobDoc = new Job({
      name: name || `build-${Date.now()}`,
      repo: repo || null,
      commit: commit || null,
      commands: commands || ['echo "no commands"'],
      status: 'queued'
    });
    
    await jobDoc.save();

    // Enqueue job with jobId so worker can update document
    await queue.add(
      'build', 
      { jobId: jobDoc._id.toString() }, 
      { 
        removeOnComplete: { count: 1000, age: 24 * 3600 }, // Keep last 1000 or 24h
        removeOnFail: { count: 5000, age: 7 * 24 * 3600 }, // Keep failed longer
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000
        }
      }
    );

    res.status(201).json({ 
      ok: true, 
      id: jobDoc._id,
      status: jobDoc.status
    });
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ ok: false, error: 'Failed to create job' });
  }
});

// GET /jobs - list all jobs (with pagination)
router.get('/jobs', async (req, res) => {
  try {
    // Validate pagination parameters
    const { error, value } = paginationSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Invalid pagination parameters' 
      });
    }

    const { page, limit } = value;
    
    const [jobs, total] = await Promise.all([
      Job.find()
        .select('-logs') // Exclude logs from list view for performance
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit)
        .lean()
        .exec(),
      Job.countDocuments()
    ]);

    res.json({ 
      ok: true, 
      jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ ok: false, error: 'Failed to fetch jobs' });
  }
});

// GET /jobs/:id - job details & logs
router.get('/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ ok: false, error: 'Invalid job ID format' });
    }

    const job = await Job.findById(id).exec();
    
    if (!job) {
      return res.status(404).json({ ok: false, error: 'Job not found' });
    }

    res.json({ ok: true, job });
  } catch (err) {
    console.error('Error fetching job:', err);
    res.status(500).json({ ok: false, error: 'Failed to fetch job' });
  }
});

// DELETE /jobs/:id - cancel/delete a job
router.delete('/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ ok: false, error: 'Invalid job ID format' });
    }

    const job = await Job.findById(id);
    
    if (!job) {
      return res.status(404).json({ ok: false, error: 'Job not found' });
    }

    // Only allow deletion of non-running jobs
    if (job.status === 'running') {
      return res.status(400).json({ 
        ok: false, 
        error: 'Cannot delete a running job. Please wait for it to complete.' 
      });
    }

    await Job.findByIdAndDelete(id);
    res.json({ ok: true, message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ ok: false, error: 'Failed to delete job' });
  }
});

module.exports = router;
