const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('followers', 'username displayName avatar')
      .populate('following', 'username displayName avatar');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update profile
router.put('/:userId', async (req, res) => {
  try {
    const { displayName, bio, avatar } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { displayName, bio, avatar },
      { new: true }
    ).select('-password');

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Follow user
router.post('/follow', async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;

    await User.findByIdAndUpdate(userId, {
      $addToSet: { following: targetUserId }
    });

    await User.findByIdAndUpdate(targetUserId, {
      $addToSet: { followers: userId }
    });

    res.json({ success: true, message: 'User followed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unfollow user
router.post('/unfollow', async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;

    await User.findByIdAndUpdate(userId, {
      $pull: { following: targetUserId }
    });

    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: userId }
    });

    res.json({ success: true, message: 'User unfollowed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard
router.get('/leaderboard/top', async (req, res) => {
  try {
    const topStreamers = await User.find({ role: 'streamer' })
      .sort({ totalGiftsReceived: -1 })
      .limit(50)
      .select('username displayName avatar totalGiftsReceived');

    const topGifters = await User.find()
      .sort({ totalGiftsSent: -1 })
      .limit(50)
      .select('username displayName avatar totalGiftsSent');

    res.json({ success: true, topStreamers, topGifters });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
