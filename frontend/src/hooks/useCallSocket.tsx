"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../hooks/useAuth';

// Define types for call states
type CallType = 'call' | 'video call';
type CallStatus = 'calling' | 'ringing' | 'start' | 'end' | null;

interface CallData {
  callId: string;
  destination?: string;
  caller?: string;
  callType: CallType;
  status: CallStatus;
  timestamp?: string;
}

interface CallState {
  isInCall: boolean;
  activeCall: CallData | null;
  callStatus: CallStatus;
  incomingCall: CallData | null;
}

interface CallSocketReturn extends CallState {
  initiateCall: (destination: string, callType: CallType) => Promise<CallData>;
  answerCall: (callId: string) => Promise<void>;
  endCall: () => Promise<void>;
  rejectCall: (callId: string) => Promise<void>;
}

export const useCallSocket = (): CallSocketReturn => {
  const { socket, connected } = useSocket();
  const { isAuthenticated } = useAuth();
  const [callState, setCallState] = useState<CallState>({
    isInCall: false,
    activeCall: null,
    callStatus: null,
    incomingCall: null,
  });

  // Handle incoming call
  const handleIncomingCall = useCallback((callData: CallData) => {
    setCallState(prev => ({
      ...prev,
      incomingCall: callData,
    }));
  }, []);

  // Handle call status updates
  const handleCallStatus = useCallback((statusData: { callId: string, state: CallStatus }) => {
    setCallState(prev => {
      // If this is for our active call
      if (prev.activeCall && prev.activeCall.callId === statusData.callId) {
        return {
          ...prev,
          callStatus: statusData.state,
          isInCall: ['calling', 'ringing', 'start'].includes(statusData.state || ''),
          activeCall: {
            ...prev.activeCall,
            status: statusData.state,
          }
        };
      }
      return prev;
    });
  }, []);

  // Initialize call
  const initiateCall = useCallback((destination: string, callType: CallType = 'call'): Promise<CallData> => {
    if (!socket || !connected) return Promise.reject('Socket not connected');
    
    return new Promise((resolve, reject) => {
      socket.emit('call:initiate', { destination, callType }, (response: any) => {
        if (response && !response.error) {
          const callData = {
            callId: response.callId,
            destination,
            callType,
            status: 'calling' as CallStatus,
          };
          
          setCallState(prev => ({
            ...prev,
            isInCall: true,
            activeCall: callData,
            callStatus: 'calling',
          }));
          
          resolve(callData);
        } else {
          reject(response?.error || 'Failed to initiate call');
        }
      });
    });
  }, [socket, connected]);

  // Answer incoming call
  const answerCall = useCallback((callId: string): Promise<void> => {
    if (!socket || !connected) return Promise.reject('Socket not connected');
    
    return new Promise((resolve, reject) => {
      socket.emit('call:answer', { callId }, (response: any) => {
        if (response && !response.error) {
          setCallState(prev => {
            // If this is the call we're answering
            if (prev.incomingCall && prev.incomingCall.callId === callId) {
              return {
                ...prev,
                isInCall: true,
                activeCall: {
                  ...prev.incomingCall,
                  status: 'start',
                },
                callStatus: 'start',
                incomingCall: null,
              };
            }
            return prev;
          });
          resolve();
        } else {
          reject(response?.error || 'Failed to answer call');
        }
      });
    });
  }, [socket, connected]);

  // End active call
  const endCall = useCallback((): Promise<void> => {
    if (!socket || !connected || !callState.activeCall) return Promise.reject('No active call');
    
    return new Promise((resolve, reject) => {
      socket.emit('call:end', { callId: callState.activeCall?.callId }, (response: any) => {
        if (response && !response.error) {
          setCallState(prev => ({
            ...prev,
            isInCall: false,
            activeCall: null,
            callStatus: null,
          }));
          resolve();
        } else {
          reject(response?.error || 'Failed to end call');
        }
      });
    });
  }, [socket, connected, callState.activeCall]);

  // Reject incoming call
  const rejectCall = useCallback((callId: string): Promise<void> => {
    if (!socket || !connected) return Promise.reject('Socket not connected');
    
    return new Promise((resolve, reject) => {
      socket.emit('call:reject', { callId }, (response: any) => {
        if (response && !response.error) {
          setCallState(prev => ({
            ...prev,
            incomingCall: null,
          }));
          resolve();
        } else {
          reject(response?.error || 'Failed to reject call');
        }
      });
    });
  }, [socket, connected]);

  // Set up event listeners
  useEffect(() => {
    if (!socket || !connected || !isAuthenticated) return;
    
    // Listen for incoming calls
    socket.on('call:incoming', handleIncomingCall);
    
    // Listen for call status updates
    socket.on('call:status', handleCallStatus);
    
    // Clean up listeners
    return () => {
      socket.off('call:incoming', handleIncomingCall);
      socket.off('call:status', handleCallStatus);
    };
  }, [socket, connected, isAuthenticated, handleIncomingCall, handleCallStatus]);

  return {
    ...callState,
    initiateCall,
    answerCall,
    endCall,
    rejectCall,
  };
};