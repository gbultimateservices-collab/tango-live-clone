import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Discover', emoji: '🔥' },
    { path: '/leaderboard', label: 'Leaderboard', emoji: '🏆' },
    { path: '/store', label: 'Store', emoji: '💎' },
  ];

  if (!user) return null;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-lg font-bold">
                T
              </div>
              <span className="text-xl font-bold font-['Poppins'] gradient-text hidden sm:block">
                TangoLive
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 border border-pink-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="mr-1.5">{item.emoji}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Coins */}
              <Link
                to="/store"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 hover:border-yellow-400/50 transition-all"
              >
                <span className="text-sm">🪙</span>
                <span className="text-sm font-semibold text-yellow-400">
                  {user.coins?.toLocaleString() || 0}
                </span>
              </Link>

              {/* Go Live Button */}
              <Link
                to="/go-live"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-200 hover:scale-105"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Go Live
              </Link>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-all"
                >
                  <img
                    src={user.avatar || 'https://via.placeholder.com/150'}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full object-cover border-2 border-pink-500/50"
                  />
                  <span className="text-sm font-medium hidden lg:block">{user.displayName}</span>
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-card border border-white/10 shadow-2xl py-2 animate-slide-up">
                    <Link
                      to={`/profile/${user.id}`}
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <span>👤</span> My Profile
                    </Link>
                    <Link
                      to="/store"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <span>💎</span> Buy Coins
                    </Link>
                    <hr className="my-1 border-white/10" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-card border-t border-white/10">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'text-pink-400'
                  : 'text-gray-500'
              }`}
            >
              <span className="text-lg">{item.emoji}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
          <Link
            to="/go-live"
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center -mt-5 border-4 border-dark-700 shadow-lg shadow-pink-500/30">
              <span className="text-white text-sm font-bold">+</span>
            </div>
            <span className="text-[10px] font-medium text-gray-500">Live</span>
          </Link>
          <Link
            to={user ? `/profile/${user.id}` : '/login'}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              location.pathname.includes('/profile')
                ? 'text-pink-400'
                : 'text-gray-500'
            }`}
          >
            <span className="text-lg">👤</span>
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
