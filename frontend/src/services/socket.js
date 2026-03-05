import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

let socket = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const joinStream = (streamId) => {
  if (socket) {
    socket.emit('join-stream', streamId);
  }
};

export const sendMessage = (data) => {
  if (socket) {
    socket.emit('send-message', data);
  }
};

export const sendGiftEvent = (data) => {
  if (socket) {
    socket.emit('send-gift', data);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
