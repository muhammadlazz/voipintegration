const sipService = require('./sipService');
const CallLog = require('../models/CallLog');
const logger = require('../utils/logger');
const { ErrorResponse } = require('../middleware/error');
const socket = require('../websocket');

/**
 * Initiate a call
 * @param {Object} user - User object
 * @param {string} destination - Destination number
 * @param {string} callType - Call type (call/video call)
 * @returns {Object} Call information
 */
exports.initiateCall = async (user, destination, callType) => {
  try {
    // Create SIP user agent
    const userAgent = await sipService.createUserAgent(user);
    
    // Register with SIP server
    await sipService.register(userAgent);
    
    // Make call
    const callResult = await sipService.makeCall(userAgent, destination, callType);
    
    // Create call log
    const callLog = new CallLog({
      user: user._id,
      direction: 'outgoing',
      callType,
      status: 'ended', // Initially set to ended, will be updated as call progresses
      destinationNumber: destination,
      sipCallId: callResult.callId,
    });
    
    // Add initial state transition
    await callLog.addStateTransition('calling');
    
    // Emit call status to the client
    socket.emitToUser(user._id, 'call:status', {
      callId: callResult.callId,
      state: 'calling',
      callType,
      destination
    });
    
    logger.info(`Call initiated by ${user.phoneNumber} to ${destination}`);
    
    return {
      callId: callResult.callId,
      state: 'calling',
      callType,
      destination
    };
  } catch (error) {
    logger.error(`Error initiating call: ${error.message}`);
    throw new ErrorResponse(`Failed to initiate call: ${error.message}`, 500);
  }
};

/**
 * Answer an incoming call
 * @param {Object} user - User object
 * @param {string} callId - Call ID
 * @returns {boolean} Success status
 */
exports.answerCall = async (user, callId) => {
  try {
    // Answer call
    await sipService.answerCall(callId);
    
    // Update call log
    const callLog = await CallLog.findOne({ 
      sipCallId: callId,
      user: user._id
    });
    
    if (!callLog) {
      throw new ErrorResponse('Call not found', 404);
    }
    
    // Update call status
    await callLog.addStateTransition('start');
    callLog.status = 'received';
    await callLog.save();
    
    // Emit call status to the client
    socket.emitToUser(user._id, 'call:status', {
      callId,
      state: 'start'
    });
    
    logger.info(`Call ${callId} answered by ${user.phoneNumber}`);
    
    return true;
  } catch (error) {
    logger.error(`Error answering call: ${error.message}`);
    throw new ErrorResponse(`Failed to answer call: ${error.message}`, 500);
  }
};

/**
 * End a call
 * @param {Object} user - User object
 * @param {string} callId - Call ID
 * @returns {boolean} Success status
 */
exports.endCall = async (user, callId) => {
  try {
    // End call
    await sipService.endCall(callId);
    
    // Update call log
    const callLog = await CallLog.findOne({ 
      sipCallId: callId,
      user: user._id
    });
    
    if (!callLog) {
      throw new ErrorResponse('Call not found', 404);
    }
    
    // Update call status
    await callLog.addStateTransition('end');
    callLog.status = 'ended';
    await callLog.save();
    
    // Emit call status to the client
    socket.emitToUser(user._id, 'call:status', {
      callId,
      state: 'end'
    });
    
    logger.info(`Call ${callId} ended by ${user.phoneNumber}`);
    
    return true;
  } catch (error) {
    logger.error(`Error ending call: ${error.message}`);
    throw new ErrorResponse(`Failed to end call: ${error.message}`, 500);
  }
};

/**
 * Get call logs for a user
 * @param {Object} user - User object
 * @returns {Array} Call logs
 */
exports.getCallLogs = async (user) => {
  try {
    const callLogs = await CallLog.find({ user: user._id })
      .sort({ createdAt: -1 });
    
    return callLogs;
  } catch (error) {
    logger.error(`Error getting call logs: ${error.message}`);
    throw new ErrorResponse(`Failed to get call logs: ${error.message}`, 500);
  }
};

/**
 * Handle incoming call
 * @param {Object} user - User object
 * @param {string} callId - Call ID
 * @param {string} caller - Caller number
 * @param {string} callType - Call type (call/video call)
 * @returns {Object} Call log
 */
exports.handleIncomingCall = async (user, callId, caller, callType) => {
  try {
    // Create call log
    const callLog = new CallLog({
      user: user._id,
      direction: 'incoming',
      callType,
      status: 'received',
      destinationNumber: caller, // For incoming calls, this is the caller
      sipCallId: callId,
    });
    
    // Add initial state transition
    await callLog.addStateTransition('ringing');
    
    // Emit call status to the client
    socket.emitToUser(user._id, 'call:status', {
      callId,
      state: 'ringing',
      callType,
      caller
    });
    
    logger.info(`Incoming call to ${user.phoneNumber} from ${caller}`);
    
    return callLog;
  } catch (error) {
    logger.error(`Error handling incoming call: ${error.message}`);
    throw new ErrorResponse(`Failed to handle incoming call: ${error.message}`, 500);
  }
};