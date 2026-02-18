const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  ts: { type: Date, default: Date.now },
  message: { type: String, maxlength: 10000 } // Prevent extremely long log messages
}, { _id: false });

const JobSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    maxlength: 200,
    index: true 
  },
  repo: { 
    type: String, 
    maxlength: 500 
  },
  commit: { 
    type: String, 
    maxlength: 100 
  },
  commands: [{ 
    type: String, 
    maxlength: 1000 
  }],
  status: { 
    type: String, 
    enum: ['queued', 'running', 'success', 'failed', 'cancelled'], 
    default: 'queued',
    index: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    index: true 
  },
  startedAt: Date,
  finishedAt: Date,
  logs: {
    type: [LogSchema],
    validate: {
      validator: function(logs) {
        return logs.length <= 10000; // Limit to 10000 log entries
      },
      message: 'Job cannot have more than 10000 log entries'
    }
  },
  meta: mongoose.Schema.Types.Mixed
});

// Compound index for efficient queries
JobSchema.index({ status: 1, createdAt: -1 });

// Method to append log with size protection
JobSchema.methods.appendLog = async function(msg) {
  // Truncate message if too long
  const truncatedMsg = msg.length > 10000 ? msg.substring(0, 9997) + '...' : msg;
  
  // If we're approaching the log limit, remove oldest entries
  if (this.logs.length >= 9900) {
    this.logs = this.logs.slice(-9000); // Keep last 9000 entries
    this.logs.push({ 
      message: '[WARNING: Log limit reached. Oldest logs removed to prevent memory issues.]' 
    });
  }
  
  this.logs.push({ message: truncatedMsg });
  this.markModified('logs');
  return this.save();
};

// Virtual for duration
JobSchema.virtual('duration').get(function() {
  if (this.startedAt && this.finishedAt) {
    return this.finishedAt - this.startedAt;
  }
  return null;
});

// Ensure virtuals are included in JSON
JobSchema.set('toJSON', { virtuals: true });
JobSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Job', JobSchema);
