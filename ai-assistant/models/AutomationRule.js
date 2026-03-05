const mongoose = require('mongoose');

const automationRuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  trigger: {
    type: {
      type: String,
      enum: ['time', 'event', 'location', 'battery', 'wifi', 'bluetooth', 'app', 'custom'],
      required: true
    },
    // Time-based triggers
    cronExpression: { type: String, default: '' },
    time: { type: String, default: '' }, // HH:MM format
    days: [{ type: Number }], // 0-6 for days of week
    // Event-based triggers
    eventName: { type: String, default: '' },
    // Condition-based triggers
    condition: {
      field: { type: String, default: '' },
      operator: { type: String, enum: ['eq', 'neq', 'gt', 'lt', 'gte', 'lte', 'contains', ''], default: '' },
      value: { type: mongoose.Schema.Types.Mixed, default: '' }
    }
  },
  actions: [{
    type: {
      type: String,
      enum: ['device_command', 'app_action', 'notification', 'task_create', 'custom'],
      required: true
    },
    command: { type: String, default: '' },
    params: { type: Object, default: {} },
    targetDevice: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', default: null },
    delay: { type: Number, default: 0 } // delay in seconds before executing
  }],
  isEnabled: {
    type: Boolean,
    default: true
  },
  lastTriggered: {
    type: Date,
    default: null
  },
  triggerCount: {
    type: Number,
    default: 0
  },
  maxTriggers: {
    type: Number,
    default: 0 // 0 = unlimited
  },
  priority: {
    type: Number,
    default: 5,
    min: 1,
    max: 10
  }
}, {
  timestamps: true
});

// Get active rules
automationRuleSchema.statics.getActive = async function() {
  return await this.find({ isEnabled: true }).sort({ priority: -1 });
};

// Get time-based rules
automationRuleSchema.statics.getTimeRules = async function() {
  return await this.find({ 'trigger.type': 'time', isEnabled: true });
};

// Get event-based rules
automationRuleSchema.statics.getEventRules = async function(eventName) {
  return await this.find({ 
    'trigger.type': 'event', 
    'trigger.eventName': eventName,
    isEnabled: true 
  });
};

module.exports = mongoose.model('AutomationRule', automationRuleSchema);
