import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Users
export const usersAPI = {
  getProfile: (userId) => api.get(`/users/${userId}`),
  updateProfile: (userId, data) => api.put(`/users/${userId}`, data),
  follow: (userId, targetUserId) => api.post('/users/follow', { userId, targetUserId }),
  unfollow: (userId, targetUserId) => api.post('/users/unfollow', { userId, targetUserId }),
  getLeaderboard: () => api.get('/users/leaderboard/top'),
};

// Streams
export const streamsAPI = {
  startStream: (data) => api.post('/streams/start', data),
  endStream: (streamId) => api.post(`/streams/end/${streamId}`),
  getLiveStreams: () => api.get('/streams/live'),
  joinStream: (streamId, userId) => api.post(`/streams/join/${streamId}`, { userId }),
};

// Gifts
export const giftsAPI = {
  getAllGifts: () => api.get('/gifts'),
  sendGift: (data) => api.post('/gifts/send', data),
  getHistory: (userId) => api.get(`/gifts/history/${userId}`),
};

// Payments
export const paymentsAPI = {
  createRazorpayOrder: (data) => api.post('/payments/razorpay/create-order', data),
  verifyRazorpay: (data) => api.post('/payments/razorpay/verify', data),
  initiatePaytm: (data) => api.post('/payments/paytm/initiate', data),
  initiatePhonePe: (data) => api.post('/payments/phonepe/initiate', data),
  getHistory: (userId) => api.get(`/payments/history/${userId}`),
};

export default api;
