import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usersAPI } from '../services/api';

const DEMO_STREAMERS = [
  { _id: '1', displayName: 'Priya Sharma', username: 'priya_live', avatar: '', totalGiftsReceived: 125000 },
  { _id: '2', displayName: 'Neha Kapoor', username: 'neha_dance', avatar: '', totalGiftsReceived: 98500 },
  { _id: '3', displayName: 'Rahul Singh', username: 'rahul_music', avatar: '', totalGiftsReceived: 76200 },
  { _id: '4', displayName: 'Anita Verma', username: 'anita_cooks', avatar: '', totalGiftsReceived: 54300 },
  { _id: '5', displayName: 'Vikram Rao', username: 'vikram_art', avatar: '', totalGiftsReceived: 43100 },
  { _id: '6', displayName: 'Meera Joshi', username: 'meera_yoga', avatar: '', totalGiftsReceived: 32800 },
  { _id: '7', displayName: 'Arjun Patel', username: 'arjun_gamer', avatar: '', totalGiftsReceived: 28500 },
  { _id: '8', displayName: 'Pooja Nair', username: 'pooja_comedy', avatar: '', totalGiftsReceived: 21200 },
];

const DEMO_GIFTERS = [
  { _id: '10', displayName: 'Amit Kumar', username: 'amit_k', avatar: '', totalGiftsSent: 89000 },
  { _id: '11', displayName: 'Sanjay Gupta', username: 'sanjay_g', avatar: '', totalGiftsSent: 67500 },
  { _id: '12', displayName: 'Ravi Sharma', username: 'ravi_s', avatar: '', totalGiftsSent: 54200 },
  { _id: '13', displayName: 'Deepak Jain', username: 'deepak_j', avatar: '', totalGiftsSent: 43800 },
  { _id: '14', displayName: 'Kiran Reddy', username: 'kiran_r', avatar: '', totalGiftsSent: 32100 },
  { _id: '15', displayName: 'Suresh Patel', username: 'suresh_p', avatar: '', totalGiftsSent: 28700 },
  { _id: '16', displayName: 'Manish Verma', username: 'manish_v', avatar: '', totalGiftsSent: 21400 },
  { _id: '17', displayName: 'Rajesh Singh', username: 'rajesh_s', avatar: '', totalGiftsSent: 18900 },
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('streamers');
  const [topStreamers, setTopStreamers] = useState(DEMO_STREAMERS);
  const [topGifters, setTopGifters] = useState(DEMO_GIFTERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await usersAPI.getLeaderboard();
        if (response.data.topStreamers?.length > 0) {
          setTopStreamers(response.data.topStreamers);
        }
        if (response.data.topGifters?.length > 0) {
          setTopGifters(response.data.topGifters);
        }
      } catch (err) {
        // Use demo data
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const getRankStyle = (index) => {
    if (index === 0) return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
    if (index === 1) return 'from-gray-400/20 to-gray-500/20 border-gray-400/30';
    if (index === 2) return 'from-orange-600/20 to-amber-700/20 border-orange-600/30';
    return 'from-white/5 to-white/5 border-white/5';
  };

  const getRankEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const currentList = activeTab === 'streamers' ? topStreamers : topGifters;
  const valueKey = activeTab === 'streamers' ? 'totalGiftsReceived' : 'totalGiftsSent';

  return (
    <div className="min-h-screen bg-dark-700 pt-20 pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-['Poppins'] gradient-text mb-2">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-500 text-sm">Top streamers and gifters this month</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 p-1 rounded-2xl glass-card border border-white/10">
          <button
            onClick={() => setActiveTab('streamers')}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'streamers'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            🎥 Top Streamers
          </button>
          <button
            onClick={() => setActiveTab('gifters')}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'gifters'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            💝 Top Gifters
          </button>
        </div>

        {/* Top 3 Podium */}
        {!loading && currentList.length >= 3 && (
          <div className="flex items-end justify-center gap-3 mb-8">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <img
                src={currentList[1]?.avatar || 'https://via.placeholder.com/150'}
                alt=""
                className="w-16 h-16 rounded-full border-3 border-gray-400 object-cover mb-2"
              />
              <span className="text-2xl">🥈</span>
              <p className="text-xs font-semibold text-white mt-1 truncate max-w-[80px]">
                {currentList[1]?.displayName}
              </p>
              <p className="text-[10px] text-yellow-400 font-medium">
                🪙 {(currentList[1]?.[valueKey] || 0).toLocaleString()}
              </p>
              <div className="w-20 h-16 mt-2 rounded-t-xl bg-gradient-to-t from-gray-500/20 to-gray-400/10 border border-gray-400/20" />
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center -mt-4">
              <div className="relative">
                <img
                  src={currentList[0]?.avatar || 'https://via.placeholder.com/150'}
                  alt=""
                  className="w-20 h-20 rounded-full border-3 border-yellow-500 object-cover mb-2 shadow-lg shadow-yellow-500/30"
                />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">👑</div>
              </div>
              <span className="text-2xl">🥇</span>
              <p className="text-sm font-bold text-white mt-1 truncate max-w-[100px]">
                {currentList[0]?.displayName}
              </p>
              <p className="text-xs text-yellow-400 font-semibold">
                🪙 {(currentList[0]?.[valueKey] || 0).toLocaleString()}
              </p>
              <div className="w-24 h-24 mt-2 rounded-t-xl bg-gradient-to-t from-yellow-500/20 to-yellow-400/10 border border-yellow-500/20" />
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <img
                src={currentList[2]?.avatar || 'https://via.placeholder.com/150'}
                alt=""
                className="w-16 h-16 rounded-full border-3 border-orange-600 object-cover mb-2"
              />
              <span className="text-2xl">🥉</span>
              <p className="text-xs font-semibold text-white mt-1 truncate max-w-[80px]">
                {currentList[2]?.displayName}
              </p>
              <p className="text-[10px] text-yellow-400 font-medium">
                🪙 {(currentList[2]?.[valueKey] || 0).toLocaleString()}
              </p>
              <div className="w-20 h-12 mt-2 rounded-t-xl bg-gradient-to-t from-orange-600/20 to-orange-500/10 border border-orange-600/20" />
            </div>
          </div>
        )}

        {/* Full List */}
        <div className="space-y-2">
          {loading
            ? [...Array(8)].map((_, i) => (
                <div key={i} className="h-16 rounded-2xl bg-white/5 animate-pulse" />
              ))
            : currentList.map((user, index) => (
                <Link
                  key={user._id}
                  to={`/profile/${user._id}`}
                  className={`flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r ${getRankStyle(index)} border transition-all hover:scale-[1.01] hover:shadow-lg`}
                >
                  <div className="w-8 text-center">
                    <span className={`text-sm font-bold ${index < 3 ? 'text-lg' : 'text-gray-500'}`}>
                      {getRankEmoji(index)}
                    </span>
                  </div>
                  <img
                    src={user.avatar || 'https://via.placeholder.com/150'}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border-2 border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {user.displayName}
                    </p>
                    <p className="text-[11px] text-gray-500">@{user.username}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-yellow-400">
                      🪙 {(user[valueKey] || 0).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {activeTab === 'streamers' ? 'received' : 'sent'}
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
