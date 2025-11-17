const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  ts: { type: Date, default: Date.now },
  message: String
});

const JobSchema = new mongoose.Schema({
  name: String,
  repo: String,
  commit: String,
  commands: [String],
  status: { type: String, enum: ['queued','running','success','failed','cancelled'], default: 'queued' },
  createdAt: { type: Date, default: Date.now },
  startedAt: Date,
  finishedAt: Date,
  logs: [LogSchema],
  meta: mongoose.Schema.Types.Mixed
});

JobSchema.methods.appendLog = function (msg) {
  this.logs.push({ message: msg });
  return this.save();
};

module.exports = mongoose.model('Job', JobSchema);
