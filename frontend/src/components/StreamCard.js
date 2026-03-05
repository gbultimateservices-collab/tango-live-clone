import React from 'react';
import { Link } from 'react-router-dom';

const StreamCard = ({ stream }) => {
  const streamer = stream.streamer || {};

  return (
    <Link
      to={`/stream/${stream._id}`}
      className="group block rounded-2xl overflow-hidden glass-card border border-white/5 hover:border-pink-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/10"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/5] bg-gradient-to-br from-purple-900/50 to-pink-900/50 overflow-hidden">
        {stream.thumbnail ? (
          <img
            src={stream.thumbnail}
            alt={stream.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
            <div className="text-center">
              <div className="text-5xl mb-2">🎥</div>
              <p className="text-white/50 text-sm">{streamer.displayName || 'Streamer'}</p>
            </div>
          </div>
        )}

        {/* Live Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/90 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white live-badge" />
          <span className="text-[11px] font-bold text-white uppercase tracking-wider">Live</span>
        </div>

        {/* Viewer Count */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
          <span className="text-[11px]">👁</span>
          <span className="text-[11px] font-medium text-white">
            {stream.currentViewers || 0}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <img
              src={streamer.avatar || 'https://via.placeholder.com/150'}
              alt={streamer.displayName}
              className="w-7 h-7 rounded-full border-2 border-pink-500/50 object-cover"
            />
            <span className="text-xs font-semibold text-white truncate">
              {streamer.displayName || streamer.username || 'Unknown'}
            </span>
          </div>
          <p className="text-xs text-white/70 truncate">{stream.title}</p>
          {stream.totalGifts > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px]">🎁</span>
              <span className="text-[10px] text-yellow-400 font-medium">
                {stream.totalGifts.toLocaleString()} coins
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default StreamCard;
