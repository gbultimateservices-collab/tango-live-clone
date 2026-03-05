import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { streamsAPI } from '../services/api';
import { connectSocket, joinStream, disconnectSocket } from '../services/socket';
import LiveChat from '../components/LiveChat';
import GiftPanel from '../components/GiftPanel';
import GiftAnimation from '../components/GiftAnimation';

const StreamView = () => {
  const { streamId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGifts, setShowGifts] = useState(false);
  const [showChat, setShowChat] = useState(true);

  useEffect(() => {
    const initStream = async () => {
      try {
        const socket = connectSocket();
        const response = await streamsAPI.joinStream(streamId, user?.id);
        setStream(response.data.stream);
        joinStream(streamId);
      } catch (err) {
        // Demo stream fallback
        setStream({
          id: streamId,
          title: 'Live Stream',
          description: 'Welcome to the stream!',
          channelName: 'demo_channel',
          streamer: { displayName: 'Streamer', avatar: '' },
          currentViewers: 42,
        });
      } finally {
        setLoading(false);
      }
    };

    initStream();

    return () => {
      // Cleanup on unmount
    };
  }, [streamId, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-700 flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col lg:flex-row">
      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Video Player Placeholder */}
        <div className="relative w-full aspect-video lg:h-screen bg-gradient-to-br from-dark-500 via-dark-600 to-dark-700">
          {/* Simulated Video Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-dark-600 to-pink-900/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4 animate-float">🎥</div>
                <p className="text-white/50 text-sm">Live Video Stream</p>
                <p className="text-white/30 text-xs mt-1">Agora WebRTC Integration</p>
              </div>
            </div>
          </div>

          {/* Gift Animations Overlay */}
          <GiftAnimation streamId={streamId} />

          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all"
              >
                ←
              </button>
              <div className="flex items-center gap-2">
                <img
                  src={stream?.streamer?.avatar || 'https://via.placeholder.com/150'}
                  alt=""
                  className="w-9 h-9 rounded-full border-2 border-pink-500"
                />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {stream?.streamer?.displayName || stream?.title || 'Streamer'}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[10px] text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 live-badge" />
                      LIVE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                <span className="text-[11px]">👁</span>
                <span className="text-[11px] font-medium text-white">
                  {stream?.currentViewers || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent z-20 lg:hidden">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowChat(!showChat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  showChat
                    ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                    : 'bg-black/40 text-white backdrop-blur-sm'
                }`}
              >
                💬 Chat
              </button>
              <button
                onClick={() => setShowGifts(!showGifts)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  showGifts
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-black/40 text-white backdrop-blur-sm'
                }`}
              >
                🎁 Gifts
              </button>
              <div className="flex-1" />
              <button className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold">
                Follow
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Gift Panel */}
        {showGifts && (
          <div className="lg:hidden glass-card border-t border-white/10 animate-slide-up">
            <GiftPanel
              streamId={streamId}
              receiverId={stream?.streamer?._id}
              user={user}
            />
          </div>
        )}
      </div>

      {/* Sidebar - Chat & Gifts */}
      <div className="hidden lg:flex flex-col w-96 border-l border-white/10 bg-dark-700">
        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => { setShowChat(true); setShowGifts(false); }}
            className={`flex-1 py-3 text-sm font-medium transition-all ${
              showChat && !showGifts
                ? 'text-pink-400 border-b-2 border-pink-500'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            💬 Chat
          </button>
          <button
            onClick={() => { setShowGifts(true); setShowChat(false); }}
            className={`flex-1 py-3 text-sm font-medium transition-all ${
              showGifts && !showChat
                ? 'text-yellow-400 border-b-2 border-yellow-500'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            🎁 Gifts
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {showChat && !showGifts && (
            <LiveChat streamId={streamId} user={user} />
          )}
          {showGifts && !showChat && (
            <GiftPanel
              streamId={streamId}
              receiverId={stream?.streamer?._id}
              user={user}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StreamView;
