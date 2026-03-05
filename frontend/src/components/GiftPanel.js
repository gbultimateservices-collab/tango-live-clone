import React, { useState, useEffect } from 'react';
import { giftsAPI } from '../services/api';
import { sendGiftEvent } from '../services/socket';

const DEMO_GIFTS = [
  { _id: '1', name: 'Rose', image: '🌹', coinValue: 10, category: 'basic' },
  { _id: '2', name: 'Heart', image: '❤️', coinValue: 50, category: 'basic' },
  { _id: '3', name: 'Star', image: '⭐', coinValue: 100, category: 'basic' },
  { _id: '4', name: 'Diamond', image: '💎', coinValue: 500, category: 'premium' },
  { _id: '5', name: 'Crown', image: '👑', coinValue: 1000, category: 'premium' },
  { _id: '6', name: 'Rocket', image: '🚀', coinValue: 2000, category: 'premium' },
  { _id: '7', name: 'Castle', image: '🏰', coinValue: 5000, category: 'luxury' },
  { _id: '8', name: 'Universe', image: '🌌', coinValue: 10000, category: 'luxury' },
];

const GiftPanel = ({ streamId, receiverId, user, onGiftSent }) => {
  const [gifts, setGifts] = useState(DEMO_GIFTS);
  const [selectedGift, setSelectedGift] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sending, setSending] = useState(false);
  const [activeCategory, setActiveCategory] = useState('basic');
  const [flyingGifts, setFlyingGifts] = useState([]);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await giftsAPI.getAllGifts();
        if (response.data.gifts?.length > 0) {
          setGifts(response.data.gifts);
        }
      } catch (err) {
        // Use demo gifts on error
      }
    };
    fetchGifts();
  }, []);

  const handleSendGift = async () => {
    if (!selectedGift || !user || sending) return;

    const totalCost = selectedGift.coinValue * quantity;
    if ((user.coins || 0) < totalCost) {
      alert('Not enough coins! Visit the store to buy more.');
      return;
    }

    setSending(true);
    try {
      await giftsAPI.sendGift({
        senderId: user.id,
        receiverId,
        streamId,
        giftId: selectedGift._id,
        quantity,
      });

      sendGiftEvent({
        streamId,
        senderName: user.displayName || user.username,
        giftName: selectedGift.name,
        giftImage: selectedGift.image,
        quantity,
        totalCoins: totalCost,
      });

      // Flying gift animation
      const newGift = {
        id: Date.now(),
        image: selectedGift.image,
        name: selectedGift.name,
      };
      setFlyingGifts((prev) => [...prev, newGift]);
      setTimeout(() => {
        setFlyingGifts((prev) => prev.filter((g) => g.id !== newGift.id));
      }, 2000);

      if (onGiftSent) onGiftSent(totalCost);
      setSelectedGift(null);
      setQuantity(1);
    } catch (err) {
      console.error('Failed to send gift:', err);
    } finally {
      setSending(false);
    }
  };

  const categories = [
    { key: 'basic', label: 'Basic', emoji: '🌟' },
    { key: 'premium', label: 'Premium', emoji: '💫' },
    { key: 'luxury', label: 'Luxury', emoji: '👑' },
  ];

  const filteredGifts = gifts.filter((g) => g.category === activeCategory);

  return (
    <div className="relative">
      {/* Flying Gifts Animation */}
      {flyingGifts.map((fg) => (
        <div
          key={fg.id}
          className="absolute bottom-full left-1/2 -translate-x-1/2 animate-gift-fly pointer-events-none z-50"
        >
          <div className="text-4xl">{fg.image}</div>
        </div>
      ))}

      {/* Category Tabs */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === cat.key
                ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 border border-pink-500/30'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gift Grid */}
      <div className="grid grid-cols-4 gap-2 p-3">
        {filteredGifts.map((gift) => (
          <button
            key={gift._id}
            onClick={() => setSelectedGift(gift)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${
              selectedGift?._id === gift._id
                ? 'bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/40 scale-105'
                : 'bg-white/5 border border-transparent hover:bg-white/10 hover:scale-105'
            }`}
          >
            <span className="text-2xl">{gift.image || '🎁'}</span>
            <span className="text-[10px] text-gray-400 truncate w-full text-center">
              {gift.name}
            </span>
            <span className="text-[10px] font-semibold text-yellow-400">
              🪙 {gift.coinValue}
            </span>
          </button>
        ))}
      </div>

      {/* Send Section */}
      {selectedGift && (
        <div className="flex items-center gap-2 px-3 py-2 border-t border-white/10 animate-slide-up">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xl">{selectedGift.image}</span>
            <div>
              <p className="text-xs font-medium text-white">{selectedGift.name}</p>
              <p className="text-[10px] text-yellow-400">🪙 {selectedGift.coinValue * quantity}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-6 h-6 rounded-lg bg-white/10 text-white text-xs flex items-center justify-center hover:bg-white/20"
            >
              -
            </button>
            <span className="text-sm font-medium text-white w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-6 h-6 rounded-lg bg-white/10 text-white text-xs flex items-center justify-center hover:bg-white/20"
            >
              +
            </button>
          </div>

          <button
            onClick={handleSendGift}
            disabled={sending}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-pink-500/25 transition-all"
          >
            {sending ? '...' : 'Send'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GiftPanel;
