"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

// Define socket type to avoid TypeScript issues
type SocketType = any;

interface SocketContextType {
  socket: SocketType | null;
  connected: boolean;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<SocketType | null>(null);
  const [connected, setConnected] = useState(false);
  const { isAuthenticated, token } = useAuth();
  
  const BACKEND_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

  useEffect(() => {
    // Only connect if authenticated
    if (!isAuthenticated || !token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setConnected(false);
      }
      return;
    }

    // Create socket connection with authentication
    const socketInstance = io(BACKEND_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    // Set up event listeners
    socketInstance.on('connect', () => {
      console.log('Socket connected');
      setConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });

    socketInstance.on('connect_error', (error: { message: any; }) => {
      console.error('Socket connection error:', error.message);
      setConnected(false);
    });

    // Store socket instance
    setSocket(socketInstance);

    // Clean up on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [isAuthenticated, token]);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};