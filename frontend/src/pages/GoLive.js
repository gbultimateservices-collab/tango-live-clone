import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { streamsAPI } from '../services/api';

const GoLive = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartStream = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a stream title');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await streamsAPI.startStream({
        userId: user.id,
        title: title.trim(),
        description: description.trim(),
      });

      const streamData = response.data.stream;
      navigate(`/stream/${streamData.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to start stream. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-700 pt-20 pb-24 md:pb-8">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg shadow-red-500/30 animate-pulse-glow">
            🎥
          </div>
          <h1 className="text-3xl font-bold font-['Poppins'] gradient-text mb-2">
            Go Live
          </h1>
          <p className="text-gray-500 text-sm">Start streaming and connect with your audience</p>
        </div>

        {/* Form */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
          <form onSubmit={handleStartStream} className="space-y-5">
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-slide-up">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Stream Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's your stream about?"
                required
                maxLength={100}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/25 transition-all"
              />
              <p className="text-[11px] text-gray-600 mt-1">{title.length}/100</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell viewers what to expect..."
                rows={3}
                maxLength={500}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/25 transition-all resize-none"
              />
              <p className="text-[11px] text-gray-600 mt-1">{description.length}/500</p>
            </div>

            {/* Preview */}
            <div className="rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-4 border border-white/5">
              <p className="text-[11px] text-gray-500 mb-2 uppercase tracking-wider font-medium">Preview</p>
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatar || 'https://via.placeholder.com/150'}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-pink-500/50"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {title || 'Your stream title'}
                  </p>
                  <p className="text-[11px] text-gray-500">{user?.displayName}</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="text-[10px] text-red-400 font-bold">LIVE</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="space-y-2">
              <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">Tips for a great stream</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { emoji: '💡', text: 'Good lighting' },
                  { emoji: '🎤', text: 'Clear audio' },
                  { emoji: '📱', text: 'Stable connection' },
                  { emoji: '😊', text: 'Be yourself!' },
                ].map((tip) => (
                  <div key={tip.text} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5">
                    <span className="text-sm">{tip.emoji}</span>
                    <span className="text-[11px] text-gray-400">{tip.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !title.trim()}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold text-base hover:shadow-xl hover:shadow-red-500/25 transition-all duration-200 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Starting stream...
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  Start Live Stream
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GoLive;
