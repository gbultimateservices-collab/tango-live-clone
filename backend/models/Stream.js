const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
  streamer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  thumbnail: {
    type: String,
    default: ''
  },
  agoraChannelName: {
    type: String,
    required: true,
    unique: true
  },
  agoraToken: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['live', 'ended', 'scheduled'],
    default: 'live'
  },
  viewers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  currentViewers: {
    type: Number,
    default: 0
  },
  totalViewers: {
    type: Number,
    default: 0
  },
  totalGifts: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  endedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Stream', streamSchema);
