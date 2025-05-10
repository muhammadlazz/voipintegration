const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const kamailioService = require('../services/kamailioService');

/**
 * @desc    Check backend health
 * @route   GET /api/health
 * @access  Public
 */
exports.checkHealth = asyncHandler(async (req, res) => {
  // Check database connection
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  // Check Kamailio server
  const kamailioStatus = await kamailioService.checkServerHealth();
  
  // Server information
  const serverInfo = {
    status: 'online',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  };
  
  res.status(200).json({
    success: true,
    data: {
      server: serverInfo,
      database: {
        status: dbStatus,
        name: mongoose.connection.name,
        host: mongoose.connection.host,
      },
      kamailio: kamailioStatus,
    },
  });
});

/**
 * @desc    Check frontend-backend connectivity
 * @route   GET /api/health/connectivity
 * @access  Public
 */
exports.checkConnectivity = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is reachable',
    timestamp: new Date().toISOString(),
    clientIp: req.ip || req.connection.remoteAddress,
    headers: req.headers['user-agent'],
  });
});