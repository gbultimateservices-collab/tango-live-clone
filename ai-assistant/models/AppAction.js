const mongoose = require('mongoose');

const appActionSchema = new mongoose.Schema({
  actionType: {
    type: String,
    enum: ['open_app', 'close_app', 'send_message', 'make_call', 'send_sms', 
           'take_photo', 'play_media', 'stop_media', 'navigate', 'search',
           'share', 'download', 'install', 'uninstall', 'notification'],
    required: true
  },
  appName: {
    type: String,
    required: true
  },
  appPackage: {
    type: String,
    default: ''
  },
  targetDevice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    default: null
  },
  params: {
    contact: { type: String, default: '' },
    message: { type: String, default: '' },
    url: { type: String, default: '' },
    query: { type: String, default: '' },
    filePath: { type: String, default: '' },
    mode: { type: String, default: '' },
    extra: { type: Object, default: {} }
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'executed', 'failed', 'cancelled'],
    default: 'pending'
  },
  result: {
    success: { type: Boolean, default: false },
    message: { type: String, default: '' },
    data: { type: Object, default: {} }
  },
  executionTime: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Get recent actions
appActionSchema.statics.getRecent = async function(limit = 20) {
  return await this.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('targetDevice', 'name type');
};

// Get actions by app
appActionSchema.statics.getByApp = async function(appName, limit = 20) {
  return await this.find({ appName: new RegExp(appName, 'i') })
    .sort({ createdAt: -1 })
    .limit(limit);
};

module.exports = mongoose.model('AppAction', appActionSchema);
