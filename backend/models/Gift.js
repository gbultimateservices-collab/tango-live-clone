const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  coinValue: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['basic', 'premium', 'luxury'],
    default: 'basic'
  },
  animation: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const giftTransactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stream: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stream',
    required: true
  },
  gift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gift',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  totalCoins: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Gift = mongoose.model('Gift', giftSchema);
const GiftTransaction = mongoose.model('GiftTransaction', giftTransactionSchema);

module.exports = { Gift, GiftTransaction };
