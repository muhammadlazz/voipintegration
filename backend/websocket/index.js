const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

// Store active connections
const activeConnections = new Map();
let io;

/**
 * Initialize WebSocket server
 * @param {Object} server - HTTP server
 */
const init = (server) => {
  io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL || '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
  
  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication required'));
      }
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return next(new Error('User not found'));
      }
      
      // Attach user to socket
      socket.user = user;
      next();
    } catch (error) {
      logger.error(`Socket authentication error: ${error.message}`);
      next(new Error('Authentication failed'));
    }
  });
  
  // Connection handler
  io.on('connection', (socket) => {
    const userId = socket.user._id.toString();
    logger.info(`User connected: ${userId}`);
    
    // Store connection
    activeConnections.set(userId, socket.id);
    
    // Call events
    socket.on('call:initiate', async (data) => {
      const { destination, callType } = data;
      
      try {
        // Handle via call service
        const callService = require('../services/callService');
        const result = await callService.initiateCall(socket.user, destination, callType);
        
        socket.emit('call:initiated', result);
      } catch (error) {
        logger.error(`Call initiation error: ${error.message}`);
        socket.emit('call:error', { error: error.message });
      }
    });
    
    socket.on('call:answer', async (data) => {
      const { callId } = data;
      
      try {
        // Handle via call service
        const callService = require('../services/callService');
        await callService.answerCall(socket.user, callId);
        
        socket.emit('call:answered', { callId });
      } catch (error) {
        logger.error(`Call answer error: ${error.message}`);
        socket.emit('call:error', { error: error.message });
      }
    });
    
    socket.on('call:end', async (data) => {
      const { callId } = data;
      
      try {
        // Handle via call service
        const callService = require('../services/callService');
        await callService.endCall(socket.user, callId);
        
        socket.emit('call:ended', { callId });
      } catch (error) {
        logger.error(`Call end error: ${error.message}`);
        socket.emit('call:error', { error: error.message });
      }
    });
    
    // Ping for connectivity check
    socket.on('ping', (data, callback) => {
      if (typeof callback === 'function') {
        callback({
          status: 'pong',
          timestamp: new Date().toISOString(),
          userId: socket.user._id,
        });
      }
    });
    
    // Disconnect handler
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${userId}`);
      activeConnections.delete(userId);
    });
  });
  
  return io;
};

/**
 * Emit event to specific user
 * @param {string} userId - User ID
 * @param {string} event - Event name
 * @param {Object} data - Event data
 */
const emitToUser = (userId, event, data) => {
  const socketId = activeConnections.get(userId.toString());
  
  if (socketId && io) {
    io.to(socketId).emit(event, data);
    logger.info(`Emitted ${event} to user ${userId}`);
    return true;
  }
  
  logger.warn(`Failed to emit ${event} to user ${userId}: Not connected`);
  return false;
};

module.exports = {
  init,
  emitToUser,
};