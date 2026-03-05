const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['owner', 'jeeva', 'system'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'voice', 'command', 'response', 'notification', 'error'],
    default: 'text'
  },
  metadata: {
    intent: { type: String, default: '' },
    action: { type: String, default: '' },
    confidence: { type: Number, default: 0 },
    executionResult: { type: Object, default: null }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const conversationSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  messages: [messageSchema],
  startedAt: {
    type: Date,
    default: Date.now
  },
  endedAt: {
    type: Date,
    default: null
  },
  totalMessages: {
    type: Number,
    default: 0
  },
  totalCommands: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add message to conversation
conversationSchema.methods.addMessage = async function(role, content, type = 'text', metadata = {}) {
  this.messages.push({ role, content, type, metadata });
  this.totalMessages += 1;
  if (type === 'command') this.totalCommands += 1;
  return await this.save();
};

// Get active conversation
conversationSchema.statics.getActive = async function() {
  return await this.findOne({ isActive: true }).sort({ createdAt: -1 });
};

// Get recent conversations
conversationSchema.statics.getRecent = async function(limit = 10) {
  return await this.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('sessionId startedAt endedAt totalMessages totalCommands isActive');
};

module.exports = mongoose.model('Conversation', conversationSchema);
