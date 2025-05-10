"use client";

import { useEffect, useState, useContext, createContext, ReactNode } from 'react';
import socketIOClient from 'socket.io-client';
import { useAuth } from './useAuth';  // Adjust the path to where your useAuth hook is located

// Define a type for the socket to avoid TypeScript errors
type SocketType = ReturnType<typeof socketIOClient> | null;

interface SocketContextType {
  socket: SocketType;
  connected: boolean;
}

// Create context with null as default
const SocketContext = createContext<SocketContextType | null>(null);

interface SocketProviderProps {
  children: ReactNode;
}

// Socket provider component
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<SocketType>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const { token, isAuthenticated } = useAuth();
  
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Only connect if user is authenticated
    if (!isAuthenticated || !token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setConnected(false);
      }
      return;
    }

    // Initialize socket connection
    const socketInstance = socketIOClient(BACKEND_URL, {
      auth: {
        token,
      },
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

    socketInstance.on('connect_error', (error: any) => {
      console.error('Socket connection error:', error.message);
      setConnected(false);
    });

    // Store socket instance
    setSocket(socketInstance);

    // Clean up on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [isAuthenticated, token, socket]);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket
export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};