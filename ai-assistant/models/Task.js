const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['reminder', 'alarm', 'timer', 'todo', 'schedule', 'event'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  // For reminders/alarms/schedules
  scheduledAt: {
    type: Date,
    default: null
  },
  // For timers (duration in seconds)
  duration: {
    type: Number,
    default: 0
  },
  // For recurring tasks
  recurring: {
    enabled: { type: Boolean, default: false },
    pattern: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'weekdays', 'weekends', 'custom', ''],
      default: ''
    },
    cronExpression: { type: String, default: '' },
    daysOfWeek: [{ type: Number }], // 0=Sunday, 6=Saturday
    endDate: { type: Date, default: null }
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled', 'snoozed', 'expired'],
    default: 'pending'
  },
  // For todos
  tags: [{
    type: String
  }],
  // Notification settings
  notification: {
    enabled: { type: Boolean, default: true },
    sound: { type: String, default: 'default' },
    vibrate: { type: Boolean, default: true },
    repeat: { type: Number, default: 1 } // how many times to notify
  },
  // Snooze tracking
  snoozedUntil: {
    type: Date,
    default: null
  },
  snoozeCount: {
    type: Number,
    default: 0
  },
  completedAt: {
    type: Date,
    default: null
  },
  // Link to automation if created by one
  automationRuleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AutomationRule',
    default: null
  }
}, {
  timestamps: true
});

// Get pending tasks
taskSchema.statics.getPending = async function() {
  return await this.find({ status: { $in: ['pending', 'active'] } })
    .sort({ scheduledAt: 1 });
};

// Get todos
taskSchema.statics.getTodos = async function(status = null) {
  const query = { type: 'todo' };
  if (status) query.status = status;
  return await this.find(query).sort({ priority: -1, createdAt: -1 });
};

// Get upcoming reminders
taskSchema.statics.getUpcoming = async function(minutes = 60) {
  const now = new Date();
  const future = new Date(now.getTime() + minutes * 60000);
  return await this.find({
    type: { $in: ['reminder', 'alarm', 'schedule'] },
    status: { $in: ['pending', 'active'] },
    scheduledAt: { $gte: now, $lte: future }
  }).sort({ scheduledAt: 1 });
};

// Get overdue tasks
taskSchema.statics.getOverdue = async function() {
  return await this.find({
    status: { $in: ['pending', 'active'] },
    scheduledAt: { $lt: new Date() }
  }).sort({ scheduledAt: 1 });
};

module.exports = mongoose.model('Task', taskSchema);
