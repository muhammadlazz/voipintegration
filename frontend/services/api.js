import axios from 'axios';

// Create axios instance
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth token
API.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  login: async (phoneNumber, password) => {
    const response = await API.post('/auth/login', { phoneNumber, password });
    return response.data;
  },
  
  getProfile: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  }
};

// Call services
export const callService = {
  getCalls: async () => {
    const response = await API.get('/calls/logs');
    return response.data;
  },
  
  initiateCall: async (destination, callType) => {
    const response = await API.post('/calls', { destination, callType });
    return response.data;
  },
  
  answerCall: async (callId) => {
    const response = await API.post(`/calls/${callId}/answer`);
    return response.data;
  },
  
  endCall: async (callId) => {
    const response = await API.post(`/calls/${callId}/end`);
    return response.data;
  }
};

// Health check services
export const healthService = {
  checkApiConnection: async () => {
    const response = await API.get('/health/connectivity');
    return response.data;
  },
  
  checkServerStatus: async () => {
    const response = await API.get('/health');
    return response.data;
  }
};

export default API;