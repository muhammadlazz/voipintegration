"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSocket } from '@/../contexts/SocketContext';
import { callService } from '@/../services/api';

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

interface CallResponse {
  success: boolean;
  data?: any;  // Replace 'any' with a more specific type if needed
  error?: string;
}

export function useCall() {
  const { socket, connected } = useSocket();
  const [isInCall, setIsInCall] = useState(false);
  const [activeCall, setActiveCall] = useState<CallData | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>(null);
  const [incomingCall, setIncomingCall] = useState<CallData | null>(null);
  const [callLogs, setCallLogs] = useState<CallData[]>([]); // Correct type for callLogs
  const [loading, setLoading] = useState(false);

  // Fetch call logs
  const fetchCallLogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await callService.getCalls() as CallResponse;
      if (response.success) {
        setCallLogs(response.data);
      }
    } catch (error) {
      console.error('Error fetching call logs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize a call
  const initiateCall = useCallback(async (destination: string, callType: CallType) => {
    if (!connected) {
      throw new Error('Socket not connected');
    }
    
    try {
      // Use REST API to initiate call
      const response = await callService.initiateCall(destination, callType) as CallResponse;
      
      if (response.success) {
        const callData = {
          callId: response.data.callId,
          destination,
          callType,
          status: 'calling' as CallStatus
        };
        
        setActiveCall(callData);
        setCallStatus('calling');
        setIsInCall(true);
        
        return callData;
      } else {
        throw new Error(response.error || 'Failed to initiate call');
      }
    } catch (error) {
      console.error('Call initiation error:', error);
      throw error;
    }
  }, [connected]);

  // End active call
  const endCall = useCallback(async () => {
    if (!activeCall) {
      throw new Error('No active call');
    }
    
    try {
      const response = await callService.endCall(activeCall.callId) as CallResponse;
      
      if (response.success) {
        setCallStatus('end');
        setIsInCall(false);
        setTimeout(() => {
          setActiveCall(null);
        }, 1000);
        
        // Refresh call logs
        fetchCallLogs();
        
        return true;
      }
    } catch (error) {
      console.error('Error ending call:', error);
      throw error;
    }
  }, [activeCall, fetchCallLogs]);

  // Answer incoming call
  const answerCall = useCallback(async (callId: string) => {
    if (!incomingCall) {
      throw new Error('No incoming call');
    }
    
    try {
      const response = await callService.answerCall(callId) as CallResponse;
      
      if (response.success) {
        setActiveCall(incomingCall);
        setCallStatus('start');
        setIsInCall(true);
        setIncomingCall(null);
        
        return true;
      }
    } catch (error) {
      console.error('Error answering call:', error);
      throw error;
    }
  }, [incomingCall]);

  // Socket event handlers
  useEffect(() => {
    if (!socket || !connected) return;
    
    // Handle incoming call
    const handleIncomingCall = (data: CallData) => {
      setIncomingCall(data);
    };
    
    // Handle call status updates
    const handleCallStatus = (data: { callId: string, state: CallStatus }) => {
      if (activeCall && activeCall.callId === data.callId) {
        setCallStatus(data.state);
        
        if (data.state === 'end') {
          setIsInCall(false);
          setTimeout(() => {
            setActiveCall(null);
            setCallStatus(null);
          }, 2000);
          
          // Refresh call logs after call ends
          fetchCallLogs();
        } else if (['calling', 'ringing', 'start'].includes(data.state || '')) {
          setIsInCall(true);
        }
      }
    };
    
    // Set up event listeners
    socket.on('call:incoming', handleIncomingCall);
    socket.on('call:status', handleCallStatus);
    
    // Fetch call logs when socket connects
    fetchCallLogs();
    
    // Clean up event listeners
    return () => {
      socket.off('call:incoming', handleIncomingCall);
      socket.off('call:status', handleCallStatus);
    };
  }, [socket, connected, activeCall, fetchCallLogs]);

  return {
    isInCall,
    activeCall,
    callStatus,
    incomingCall,
    callLogs,
    loading,
    initiateCall,
    endCall,
    answerCall,
    fetchCallLogs
  };
}