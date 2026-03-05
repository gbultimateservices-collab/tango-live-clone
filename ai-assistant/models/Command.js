const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  rawInput: {
    type: String,
    required: true
  },
  intent: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  params: {
    type: Object,
    default: {}
  },
  targetDevice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    default: null
  },
  response: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  executionTime: {
    type: Number,
    default: 0 // milliseconds
  },
  error: {
    type: String,
    default: ''
  },
  source: {
    type: String,
    enum: ['text', 'voice', 'automation', 'schedule'],
    default: 'text'
  },
  confidence: {
    type: Number,
    default: 0,
    min: 0,
    max: 1
  }
}, {
  timestamps: true
});

// Get recent commands
commandSchema.statics.getRecent = async function(limit = 20) {
  return await this.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('targetDevice', 'name type');
};

// Get commands by category
commandSchema.statics.getByCategory = async function(category, limit = 20) {
  return await this.find({ category })
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Get stats
commandSchema.statics.getStats = async function() {
  const total = await this.countDocuments({});
  const completed = await this.countDocuments({ status: 'completed' });
  const failed = await this.countDocuments({ status: 'failed' });
  const categories = await this.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  return { total, completed, failed, categories };
};

module.exports = mongoose.model('Command', commandSchema);
