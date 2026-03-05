import React, { useState, useEffect } from 'react';
import { streamsAPI } from '../services/api';
import StreamCard from '../components/StreamCard';

const DEMO_STREAMS = [
  {
    _id: 'demo1',
    title: 'Late Night Vibes 🌙',
    streamer: { _id: 's1', username: 'priya_live', displayName: 'Priya Sharma', avatar: '' },
    currentViewers: 1243,
    totalGifts: 45200,
    status: 'live',
  },
  {
    _id: 'demo2',
    title: 'Singing Session 🎤',
    streamer: { _id: 's2', username: 'rahul_music', displayName: 'Rahul Singh', avatar: '' },
    currentViewers: 876,
    totalGifts: 23100,
    status: 'live',
  },
  {
    _id: 'demo3',
    title: 'Cooking Indian Food 🍛',
    streamer: { _id: 's3', username: 'anita_cooks', displayName: 'Anita Verma', avatar: '' },
    currentViewers: 654,
    totalGifts: 12800,
    status: 'live',
  },
  {
    _id: 'demo4',
    title: 'Dance Practice 💃',
    streamer: { _id: 's4', username: 'neha_dance', displayName: 'Neha Kapoor', avatar: '' },
    currentViewers: 2100,
    totalGifts: 67500,
    status: 'live',
  },
  {
    _id: 'demo5',
    title: 'Gaming Night 🎮',
    streamer: { _id: 's5', username: 'arjun_gamer', displayName: 'Arjun Patel', avatar: '' },
    currentViewers: 432,
    totalGifts: 8900,
    status: 'live',
  },
  {
    _id: 'demo6',
    title: 'Yoga & Meditation 🧘',
    streamer: { _id: 's6', username: 'meera_yoga', displayName: 'Meera Joshi', avatar: '' },
    currentViewers: 321,
    totalGifts: 5600,
    status: 'live',
  },
  {
    _id: 'demo7',
    title: 'Art & Sketching 🎨',
    streamer: { _id: 's7', username: 'vikram_art', displayName: 'Vikram Rao', avatar: '' },
    currentViewers: 198,
    totalGifts: 3400,
    status: 'live',
  },
  {
    _id: 'demo8',
    title: 'Standup Comedy 😂',
    streamer: { _id: 's8', username: 'pooja_comedy', displayName: 'Pooja Nair', avatar: '' },
    currentViewers: 1567,
    totalGifts: 34200,
    status: 'live',
  },
];

const Home = () => {
  const [streams, setStreams] = useState(DEMO_STREAMS);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await streamsAPI.getLiveStreams();
        if (response.data.streams?.length > 0) {
          setStreams(response.data.streams);
        }
      } catch (err) {
        // Use demo streams
      } finally {
        setLoading(false);
      }
    };
    fetchStreams();
  }, []);

  const filters = [
    { key: 'all', label: 'All', emoji: '🔥' },
    { key: 'popular', label: 'Popular', emoji: '⭐' },
    { key: 'new', label: 'New', emoji: '✨' },
    { key: 'nearby', label: 'Nearby', emoji: '📍' },
  ];

  const filteredStreams = [...streams].sort((a, b) => {
    if (filter === 'popular') return (b.currentViewers || 0) - (a.currentViewers || 0);
    if (filter === 'new') return -1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-dark-700 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-cyan-600/20 border border-white/10 p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5" />
            <div className="relative z-10">
              <h1 className="text-2xl sm:text-3xl font-bold font-['Poppins'] text-white mb-2">
                🔥 Live Now
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Watch your favorite streamers, send gifts, and join the fun!
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 live-badge" />
                  <span className="text-sm text-gray-300">
                    <span className="font-semibold text-white">{streams.length}</span> streams live
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">👁</span>
                  <span className="text-sm text-gray-300">
                    <span className="font-semibold text-white">
                      {streams.reduce((acc, s) => acc + (s.currentViewers || 0), 0).toLocaleString()}
                    </span>{' '}
                    watching
                  </span>
                </div>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-pink-500/20 blur-3xl" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                filter === f.key
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20'
                  : 'glass-card text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{f.emoji}</span>
              {f.label}
            </button>
          ))}
        </div>

        {/* Stream Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredStreams.map((stream) => (
              <StreamCard key={stream._id} stream={stream} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && streams.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">📹</span>
            <h3 className="text-xl font-semibold text-white mb-2">No Live Streams</h3>
            <p className="text-gray-500">Be the first to go live!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
