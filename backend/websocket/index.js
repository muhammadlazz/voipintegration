const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

let io;

const initWebSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
  
  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return next(new Error('User not found'));
      }
      
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });
  
  // Handle connections
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user._id}`);
    
    // Handle call events
    socket.on('call:initiate', async (data) => {
      // Handle call initiation
    });
    
    socket.on('call:answer', async (data) => {
      // Handle call answering
    });
    
    socket.on('call:end', async (data) => {
      // Handle call ending
    });
    
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user._id}`);
    });
  });
  
  return io;
};

module.exports = { 
  init: initWebSocket,
  getIO: () => io 
};