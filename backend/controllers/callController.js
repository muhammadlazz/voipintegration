const asyncHandler = require('express-async-handler');
const callService = require('../services/callService');
const { ErrorResponse } = require('../middleware/error');

/**
 * @desc    Initiate a call
 * @route   POST /api/calls
 * @access  Private
 */
exports.initiateCall = asyncHandler(async (req, res) => {
  const { destination, callType } = req.body;

  // Validate request
  if (!destination) {
    throw new ErrorResponse('Please provide destination number', 400);
  }

  // Default to audio call if not specified
  const type = callType === 'video call' ? 'video call' : 'call';

  // Initiate call
  const call = await callService.initiateCall(req.user, destination, type);

  res.status(200).json({
    success: true,
    data: call
  });
});

/**
 * @desc    Answer a call
 * @route   POST /api/calls/:callId/answer
 * @access  Private
 */
exports.answerCall = asyncHandler(async (req, res) => {
  const { callId } = req.params;

  // Answer call
  await callService.answerCall(req.user, callId);

  res.status(200).json({
    success: true,
    message: 'Call answered'
  });
});

/**
 * @desc    End a call
 * @route   POST /api/calls/:callId/end
 * @access  Private
 */
exports.endCall = asyncHandler(async (req, res) => {
  const { callId } = req.params;

  // End call
  await callService.endCall(req.user, callId);

  res.status(200).json({
    success: true,
    message: 'Call ended'
  });
});

/**
 * @desc    Get call logs
 * @route   GET /api/calls/logs
 * @access  Private
 */
exports.getCallLogs = asyncHandler(async (req, res) => {
  // Get call logs
  const callLogs = await callService.getCallLogs(req.user);

  res.status(200).json({
    success: true,
    count: callLogs.length,
    data: callLogs
  });
});