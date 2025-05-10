const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { ErrorResponse } = require('../middleware/error');
const kamailioService = require('../services/kamailioService');

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;

  // Validate request
  if (!phoneNumber || !password) {
    throw new ErrorResponse('Please provide phone number and password', 400);
  }

  // Check if user exists
  const user = await User.findOne({ phoneNumber }).select('+password');

  if (!user) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  // Register with Kamailio server
  await kamailioService.register(user);

  // Generate token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      phoneNumber: user.phoneNumber,
      name: user.name
    }
  });
});

/**
 * @desc    Get current user
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});