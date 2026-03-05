import React, { useState, useEffect } from 'react';
import { getSocket } from '../services/socket';

const GiftAnimation = ({ streamId }) => {
  const [giftEvents, setGiftEvents] = useState([]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewGift = (data) => {
      const event = { ...data, id: Date.now() + Math.random() };
      setGiftEvents((prev) => [...prev, event]);

      setTimeout(() => {
        setGiftEvents((prev) => prev.filter((e) => e.id !== event.id));
      }, 4000);
    };

    socket.on('new-gift', handleNewGift);

    return () => {
      socket.off('new-gift', handleNewGift);
    };
  }, [streamId]);

  if (giftEvents.length === 0) return null;

  return (
    <div className="absolute left-4 bottom-24 z-30 space-y-2 pointer-events-none">
      {giftEvents.map((event) => (
        <div
          key={event.id}
          className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10 animate-slide-in-right"
        >
          <span className="text-2xl animate-bounce-in">{event.giftImage || '🎁'}</span>
          <div>
            <p className="text-xs font-semibold text-white">
              {event.senderName}
            </p>
            <p className="text-[10px] text-gray-400">
              sent {event.giftName}
              {event.quantity > 1 ? ` x${event.quantity}` : ''}
            </p>
          </div>
          <span className="text-xs font-bold text-yellow-400 ml-2">
            🪙 {event.totalCoins}
          </span>
        </div>
      ))}
    </div>
  );
};

export default GiftAnimation;
