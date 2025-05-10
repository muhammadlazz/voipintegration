"use client";

import axios from 'axios';

interface AuthResponse {
  token: string;
  user: any; // Replace `any` with your actual user type
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // (error: Axios.AxiosError) => Promise.reject(error) // Reference `AxiosError` via `axios.AxiosError`
);

// Authentication service
export const authService = {
  login: async (phoneNumber: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { phoneNumber, password });
    // Store token for subsequent requests
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  
  getProfile: async (): Promise<AuthResponse> => {
    const response = await api.get<AuthResponse>('/auth/me');
    return response.data;
  },
  
  getCurrentUser: (): any => {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    return userStr ? JSON.parse(userStr) : null;
  },
  
  isAuthenticated: () => {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }
};

// Call service for VoIP functionality
export const callService = {
  getCalls: async () => {
    const response = await api.get('/calls/logs');
    return response.data;
  },
  
  initiateCall: async (destination: string, callType: 'call' | 'video call') => {
    const response = await api.post('/calls', { destination, callType });
    return response.data;
  },
  
  endCall: async (callId: string) => {
    const response = await api.post(`/calls/${callId}/end`);
    return response.data;
  },
  
  answerCall: async (callId: string) => {
    const response = await api.post(`/calls/${callId}/answer`);
    return response.data;
  }
};

// Health check for testing the connection
export const healthService = {
  checkConnection: async () => {
    try {
      const response = await api.get('/health');
      return { status: 'connected', data: response.data };
    } catch (error) {
      return { status: 'disconnected', error };
    }
  }
};

export default api;