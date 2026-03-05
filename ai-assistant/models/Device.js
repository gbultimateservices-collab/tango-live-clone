const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['mobile', 'tv', 'laptop', 'tablet', 'smartwatch', 'speaker', 'other'],
    required: true
  },
  brand: {
    type: String,
    default: ''
  },
  model: {
    type: String,
    default: ''
  },
  os: {
    type: String,
    default: ''
  },
  osVersion: {
    type: String,
    default: ''
  },
  ipAddress: {
    type: String,
    default: ''
  },
  macAddress: {
    type: String,
    default: ''
  },
  socketId: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'sleeping', 'busy'],
    default: 'offline'
  },
  capabilities: {
    canCall: { type: Boolean, default: false },
    canSMS: { type: Boolean, default: false },
    hasCamera: { type: Boolean, default: false },
    hasBluetooth: { type: Boolean, default: false },
    hasWifi: { type: Boolean, default: false },
    hasFlashlight: { type: Boolean, default: false },
    hasGPS: { type: Boolean, default: false },
    hasSpeaker: { type: Boolean, default: false },
    hasMicrophone: { type: Boolean, default: false },
    hasStorage: { type: Boolean, default: false },
    canControlVolume: { type: Boolean, default: false },
    canControlBrightness: { type: Boolean, default: false }
  },
  currentState: {
    batteryLevel: { type: Number, default: -1 },
    isCharging: { type: Boolean, default: false },
    volumeLevel: { type: Number, default: 50 },
    brightnessLevel: { type: Number, default: 50 },
    wifiConnected: { type: Boolean, default: false },
    bluetoothConnected: { type: Boolean, default: false },
    screenOn: { type: Boolean, default: true },
    isLocked: { type: Boolean, default: false }
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  isPrimary: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Get primary device
deviceSchema.statics.getPrimary = async function() {
  return await this.findOne({ isPrimary: true, isActive: true });
};

// Get online devices
deviceSchema.statics.getOnline = async function() {
  return await this.find({ status: 'online', isActive: true });
};

// Get device by type
deviceSchema.statics.getByType = async function(type) {
  return await this.find({ type, isActive: true });
};

module.exports = mongoose.model('Device', deviceSchema);
