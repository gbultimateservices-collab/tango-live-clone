const express = require('express');
const router = express.Router();
const { Gift, GiftTransaction } = require('../models/Gift');
const User = require('../models/User');
const Stream = require('../models/Stream');

// Get all gifts
router.get('/', async (req, res) => {
  try {
    const gifts = await Gift.find({ isActive: true }).sort({ coinValue: 1 });
    res.json({ success: true, gifts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send gift
router.post('/send', async (req, res) => {
  try {
    const { senderId, receiverId, streamId, giftId, quantity = 1 } = req.body;

    const gift = await Gift.findById(giftId);
    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    const totalCoins = gift.coinValue * quantity;

    const sender = await User.findById(senderId);
    if (sender.coins < totalCoins) {
      return res.status(400).json({ error: 'Insufficient coins' });
    }

    // Deduct coins from sender
    sender.coins -= totalCoins;
    sender.totalGiftsSent += totalCoins;
    await sender.save();

    // Add coins to receiver
    await User.findByIdAndUpdate(receiverId, {
      $inc: { 
        coins: totalCoins,
        totalGiftsReceived: totalCoins
      }
    });

    // Update stream
    await Stream.findByIdAndUpdate(streamId, {
      $inc: { totalGifts: totalCoins }
    });

    // Create transaction
    const transaction = new GiftTransaction({
      sender: senderId,
      receiver: receiverId,
      stream: streamId,
      gift: giftId,
      quantity,
      totalCoins
    });
    await transaction.save();

    res.json({
      success: true,
      message: 'Gift sent successfully',
      transaction
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get gift history
router.get('/history/:userId', async (req, res) => {
  try {
    const sent = await GiftTransaction.find({ sender: req.params.userId })
      .populate('gift receiver')
      .sort({ createdAt: -1 })
      .limit(50);

    const received = await GiftTransaction.find({ receiver: req.params.userId })
      .populate('gift sender')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ success: true, sent, received });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
