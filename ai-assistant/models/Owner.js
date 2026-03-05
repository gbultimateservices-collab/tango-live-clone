const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  pin: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: '🤖'
  },
  preferences: {
    language: {
      type: String,
      enum: ['hindi', 'english', 'hinglish'],
      default: 'hinglish'
    },
    aiName: {
      type: String,
      default: 'JEEVA'
    },
    responseStyle: {
      type: String,
      enum: ['formal', 'friendly', 'funny'],
      default: 'friendly'
    },
    voiceEnabled: {
      type: Boolean,
      default: true
    },
    notificationsEnabled: {
      type: Boolean,
      default: true
    },
    autoLockTimeout: {
      type: Number,
      default: 300 // 5 minutes in seconds
    },
    theme: {
      type: String,
      enum: ['dark', 'light', 'auto'],
      default: 'dark'
    },
    wakeWord: {
      type: String,
      default: 'jeeva'
    }
  },
  stats: {
    totalCommands: {
      type: Number,
      default: 0
    },
    totalDevices: {
      type: Number,
      default: 0
    },
    totalAutomations: {
      type: Number,
      default: 0
    },
    totalNotes: {
      type: Number,
      default: 0
    },
    totalReminders: {
      type: Number,
      default: 0
    },
    lastActive: {
      type: Date,
      default: Date.now
    },
    memberSince: {
      type: Date,
      default: Date.now
    }
  },
  isSetupComplete: {
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

// Hash PIN before saving
ownerSchema.pre('save', async function(next) {
  if (!this.isModified('pin')) return next();
  this.pin = await bcrypt.hash(this.pin, 10);
  next();
});

// Compare PIN
ownerSchema.methods.comparePin = async function(candidatePin) {
  return await bcrypt.compare(candidatePin, this.pin);
};

// Only one owner allowed
ownerSchema.statics.getOwner = async function() {
  return await this.findOne({});
};

ownerSchema.statics.ownerExists = async function() {
  const count = await this.countDocuments({});
  return count > 0;
};

module.exports = mongoose.model('Owner', ownerSchema);
