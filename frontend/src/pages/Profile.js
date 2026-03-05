import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../services/api';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  const isOwnProfile = currentUser?.id === userId;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await usersAPI.getProfile(userId);
        setProfile(response.data.user);
        setIsFollowing(
          response.data.user.followers?.some((f) => f._id === currentUser?.id) || false
        );
      } catch (err) {
        // Demo profile
        setProfile({
          _id: userId,
          username: 'demo_user',
          displayName: isOwnProfile ? currentUser?.displayName : 'Demo User',
          avatar: isOwnProfile ? currentUser?.avatar : 'https://via.placeholder.com/150',
          bio: 'Welcome to my profile! 🎥 Love streaming and connecting with people.',
          role: 'streamer',
          coins: isOwnProfile ? currentUser?.coins || 0 : 5000,
          followers: [],
          following: [],
          totalGiftsReceived: 12500,
          totalGiftsSent: 3200,
          isLive: false,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, currentUser, isOwnProfile]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await usersAPI.unfollow(currentUser.id, userId);
      } else {
        await usersAPI.follow(currentUser.id, userId);
      }
      setIsFollowing(!isFollowing);
    } catch (err) {
      setIsFollowing(!isFollowing);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-700 pt-20 flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: 'Followers', value: profile?.followers?.length || 0, emoji: '👥' },
    { label: 'Following', value: profile?.following?.length || 0, emoji: '💫' },
    { label: 'Gifts Received', value: profile?.totalGiftsReceived?.toLocaleString() || 0, emoji: '🎁' },
    { label: 'Gifts Sent', value: profile?.totalGiftsSent?.toLocaleString() || 0, emoji: '💝' },
  ];

  return (
    <div className="min-h-screen bg-dark-700 pt-16 pb-24 md:pb-8">
      {/* Cover */}
      <div className="relative h-48 sm:h-56 bg-gradient-to-r from-pink-600/30 via-purple-600/30 to-cyan-600/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-700" />
        <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 mb-6">
          <div className="relative">
            <img
              src={profile?.avatar || 'https://via.placeholder.com/150'}
              alt={profile?.displayName}
              className="w-28 h-28 rounded-full border-4 border-dark-700 object-cover shadow-xl"
            />
            {profile?.isLive && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500 text-[10px] font-bold text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-white live-badge" />
                LIVE
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white font-['Poppins']">
              {profile?.displayName}
            </h1>
            <p className="text-gray-500 text-sm">@{profile?.username}</p>
            {profile?.role === 'streamer' && (
              <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-semibold border border-purple-500/30">
                🎥 Streamer
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isOwnProfile ? (
              <button className="px-6 py-2.5 rounded-xl glass-card border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all">
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleFollow}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isFollowing
                      ? 'glass-card border border-white/10 text-white hover:bg-white/10'
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/25'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button className="px-4 py-2.5 rounded-xl glass-card border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all">
                  💬
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bio */}
        {profile?.bio && (
          <p className="text-gray-400 text-sm mb-6 text-center sm:text-left">
            {profile.bio}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-4 text-center border border-white/5 hover:border-pink-500/20 transition-all"
            >
              <span className="text-xl mb-1 block">{stat.emoji}</span>
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-[11px] text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Coins (own profile) */}
        {isOwnProfile && (
          <div className="glass-card rounded-2xl p-5 border border-yellow-500/20 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center text-2xl">
                  🪙
                </div>
                <div>
                  <p className="text-sm text-gray-400">Your Coins</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {(profile?.coins || currentUser?.coins || 0).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/store')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all"
              >
                Buy Coins
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-white/10">
          {['about', 'gifts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'text-pink-400 border-b-2 border-pink-500'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab === 'about' ? '📋 About' : '🎁 Gifts'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'about' && (
          <div className="glass-card rounded-2xl p-6 border border-white/5">
            <h3 className="text-sm font-semibold text-white mb-4">About</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-sm text-gray-500">Username</span>
                <span className="text-sm text-white">@{profile?.username}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-sm text-gray-500">Role</span>
                <span className="text-sm text-white capitalize">{profile?.role || 'User'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-sm text-gray-500">Status</span>
                <span className={`text-sm ${profile?.isLive ? 'text-red-400' : 'text-gray-400'}`}>
                  {profile?.isLive ? '🔴 Live Now' : '⚫ Offline'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-500">Member Since</span>
                <span className="text-sm text-white">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString()
                    : 'Recently'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gifts' && (
          <div className="text-center py-12">
            <span className="text-5xl mb-3 block">🎁</span>
            <p className="text-gray-500 text-sm">Gift history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
