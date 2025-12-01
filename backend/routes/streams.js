const express = require('express');
const router = express.Router();
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const Stream = require('../models/Stream');
const User = require('../models/User');

// Generate Agora Token
const generateAgoraToken = (channelName, uid = 0) => {
  const appID = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  return RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
};

// Start Live Stream
router.post('/start', async (req, res) => {
  try {
    const { userId, title, description } = req.body;

    const channelName = `stream_${Date.now()}`;
    const token = generateAgoraToken(channelName);

    const stream = new Stream({
      streamer: userId,
      title,
      description,
      agoraChannelName: channelName,
      agoraToken: token,
      status: 'live'
    });

    await stream.save();

    await User.findByIdAndUpdate(userId, {
      isLive: true,
      currentStreamId: stream._id
    });

    res.json({
      success: true,
      stream: {
        id: stream._id,
        channelName: stream.agoraChannelName,
        token: stream.agoraToken,
        appId: process.env.AGORA_APP_ID
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// End Live Stream
router.post('/end/:streamId', async (req, res) => {
  try {
    const stream = await Stream.findById(req.params.streamId);
    
    if (!stream) {
      return res.status(404).json({ error: 'Stream not found' });
    }

    stream.status = 'ended';
    stream.endedAt = new Date();
    stream.duration = Math.floor((stream.endedAt - stream.startedAt) / 1000);
    await stream.save();

    await User.findByIdAndUpdate(stream.streamer, {
      isLive: false,
      currentStreamId: null
    });

    res.json({ success: true, message: 'Stream ended' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Live Streams
router.get('/live', async (req, res) => {
  try {
    const streams = await Stream.find({ status: 'live' })
      .populate('streamer', 'username displayName avatar')
      .sort({ startedAt: -1 });

    res.json({ success: true, streams });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Join Stream (Get Token)
router.post('/join/:streamId', async (req, res) => {
  try {
    const { userId } = req.body;
    const stream = await Stream.findById(req.params.streamId);

    if (!stream || stream.status !== 'live') {
      return res.status(404).json({ error: 'Stream not available' });
    }

    const token = generateAgoraToken(stream.agoraChannelName);

    if (!stream.viewers.includes(userId)) {
      stream.viewers.push(userId);
      stream.totalViewers += 1;
    }
    stream.currentViewers += 1;
    await stream.save();

    res.json({
      success: true,
      stream: {
        id: stream._id,
        channelName: stream.agoraChannelName,
        token: token,
        appId: process.env.AGORA_APP_ID,
        title: stream.title,
        description: stream.description
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
