import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSocket } from '../hooks/useSocket';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

/**
 * Component to monitor connectivity between frontend and backend
 */
const ConnectionMonitor = () => {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [socketStatus, setSocketStatus] = useState('checking');
  const [lastChecked, setLastChecked] = useState(null);
  const [details, setDetails] = useState({});
  const { socket } = useSocket();

  // Check API connectivity
  const checkApiConnection = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/health/connectivity`);
      setBackendStatus(response.data.success ? 'connected' : 'disconnected');
      setDetails({
        ...details,
        api: {
          timestamp: response.data.timestamp,
          message: response.data.message
        }
      });
    } catch (error) {
      console.error('API connection error:', error);
      setBackendStatus('disconnected');
      setDetails({
        ...details,
        api: {
          error: error.message
        }
      });
    }
    setLastChecked(new Date().toISOString());
  };

  // Check socket connectivity
  const checkSocketConnection = () => {
    if (!socket) {
      setSocketStatus('disconnected');
      return;
    }

    socket.emit('ping', {}, (response) => {
      setSocketStatus('connected');
      setDetails({
        ...details,
        socket: {
          timestamp: response.timestamp,
          userId: response.userId
        }
      });
    });

    // Set timeout to mark as disconnected if no response
    setTimeout(() => {
      if (socketStatus === 'checking') {
        setSocketStatus('disconnected');
      }
    }, 5000);
  };

  // Run checks on mount and every 30 seconds
  useEffect(() => {
    // Initial check
    checkApiConnection();
    checkSocketConnection();

    // Set up interval for periodic checks
    const interval = setInterval(() => {
      checkApiConnection();
      checkSocketConnection();
    }, 30000);

    // Clean up interval
    return () => clearInterval(interval);
  }, [socket]);

  // Styling based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-green-500';
      case 'disconnected':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Connection Status</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>API Connection:</span>
          <span className={getStatusColor(backendStatus)}>
            {backendStatus.charAt(0).toUpperCase() + backendStatus.slice(1)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Socket Connection:</span>
          <span className={getStatusColor(socketStatus)}>
            {socketStatus.charAt(0).toUpperCase() + socketStatus.slice(1)}
          </span>
        </div>
        
        {lastChecked && (
          <div className="text-xs text-gray-500 mt-2">
            Last checked: {new Date(lastChecked).toLocaleTimeString()}
          </div>
        )}
      </div>
      
      {/* Reconnect button */}
      <button 
        onClick={() => {
          checkApiConnection();
          checkSocketConnection();
        }}
        className="mt-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
      >
        Check Now
      </button>
    </div>
  );
};

export default ConnectionMonitor;