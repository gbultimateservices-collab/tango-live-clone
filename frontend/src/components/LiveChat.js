import React, { useState, useEffect, useRef } from 'react';
import { getSocket } from '../services/socket';

const LiveChat = ({ streamId, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on('new-message', handleNewMessage);

    return () => {
      socket.off('new-message', handleNewMessage);
    };
  }, [streamId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const socket = getSocket();
    if (!socket) return;

    const messageData = {
      streamId,
      userId: user.id,
      username: user.displayName || user.username,
      avatar: user.avatar,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    socket.emit('send-message', messageData);
    setNewMessage('');
  };

  const getRandomColor = (name) => {
    const colors = [
      'text-pink-400', 'text-purple-400', 'text-cyan-400',
      'text-yellow-400', 'text-green-400', 'text-orange-400',
      'text-blue-400', 'text-red-400',
    ];
    const index = (name || '').charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white">
          💬 Live Chat
        </h3>
        <p className="text-[11px] text-gray-500">{messages.length} messages</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <span className="text-3xl mb-2">💬</span>
            <p className="text-gray-500 text-sm">No messages yet</p>
            <p className="text-gray-600 text-xs">Be the first to say hi!</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className="flex items-start gap-2 py-1 animate-slide-up"
          >
            <img
              src={msg.avatar || 'https://via.placeholder.com/150'}
              alt=""
              className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5"
            />
            <div className="min-w-0">
              <span className={`text-xs font-semibold ${getRandomColor(msg.username)} mr-1.5`}>
                {msg.username}
              </span>
              <span className="text-xs text-gray-300 break-words">
                {msg.message}
              </span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/10">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Say something..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 transition-colors"
            maxLength={200}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium disabled:opacity-40 hover:shadow-lg hover:shadow-pink-500/25 transition-all"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiveChat;
