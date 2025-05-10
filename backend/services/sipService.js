const { Web, UserAgent, SessionState } = require('sip.js');
const logger = require('../utils/logger');
const kamailioConfig = require('../config/kamailio');

// Store active sessions
const activeSessions = new Map();

/**
 * Create a SIP user agent for a user
 * @param {Object} user - User object
 * @returns {UserAgent} SIP user agent instance
 */
exports.createUserAgent = async (user) => {
  try {
    // Create URI for the user
    const uri = Web.UserAgent.makeURI(`sip:${user.phoneNumber}@${kamailioConfig.auth.realm}`);
    
    if (!uri) {
      throw new Error('Invalid SIP URI');
    }
    
    // Server configuration
    const server = `${kamailioConfig.server.protocol.toLowerCase()}:${kamailioConfig.server.host}:${kamailioConfig.server.port}`;
    
    // User agent configuration
    const options = {
      uri,
      transportOptions: {
        server,
      },
      authorizationUsername: user.phoneNumber,
      authorizationPassword: user.password,
      displayName: user.name || user.phoneNumber,
      contactParams: { transport: 'udp' }, // Using UDP as required
      userAgentString: kamailioConfig.sip.userAgentString,
    };
    
    // Create user agent
    const userAgent = new Web.UserAgent(options);
    
    // Connect to SIP server
    await userAgent.start();
    
    logger.info(`SIP user agent created for ${user.phoneNumber}`);
    
    return userAgent;
  } catch (error) {
    logger.error(`Error creating SIP user agent: ${error.message}`);
    throw error;
  }
};

/**
 * Register with SIP server
 * @param {UserAgent} userAgent - SIP user agent
 * @returns {boolean} Success status
 */
exports.register = async (userAgent) => {
  try {
    // Create registerer
    const registerer = new Web.Registerer(userAgent);
    
    // Register with SIP server
    await registerer.register();
    
    logger.info('Registered with SIP server');
    
    return true;
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    throw error;
  }
};

/**
 * Make a call
 * @param {UserAgent} userAgent - SIP user agent
 * @param {string} destination - Destination number
 * @param {string} callType - Call type (call/video call)
 * @returns {Object} Call session information
 */
exports.makeCall = async (userAgent, destination, callType) => {
  try {
    // Format destination as SIP URI if it's a phone number
    let targetUri = destination;
    if (!destination.startsWith('sip:')) {
      targetUri = `sip:${destination}@${kamailioConfig.auth.realm}`;
    }
    
    // Create target URI
    const target = Web.UserAgent.makeURI(targetUri);
    
    if (!target) {
      throw new Error('Invalid target URI');
    }
    
    // Set media constraints based on call type
    const mediaConstraints = {
      audio: true,
      video: callType === 'video call',
    };
    
    // Create inviter (outgoing call)
    const inviter = new Web.Inviter(userAgent, target, {
      sessionDescriptionHandlerOptions: {
        constraints: mediaConstraints,
      },
    });
    
    // Generate call ID
    const callId = `call-${Date.now()}`;
    
    // Store session
    activeSessions.set(callId, inviter);
    
    // Send INVITE
    await inviter.invite();
    
    logger.info(`Call initiated to ${destination}, type: ${callType}, callId: ${callId}`);
    
    return {
      callId,
      session: inviter
    };
  } catch (error) {
    logger.error(`Call error: ${error.message}`);
    throw error;
  }
};

/**
 * Answer an incoming call
 * @param {string} callId - Call ID
 * @returns {boolean} Success status
 */
exports.answerCall = async (callId) => {
  try {
    const session = activeSessions.get(callId);
    
    if (!session) {
      throw new Error('Call not found');
    }
    
    if (!(session instanceof Web.Invitation)) {
      throw new Error('Invalid session type for answer operation');
    }
    
    // Accept call
    await session.accept({
      sessionDescriptionHandlerOptions: {
        constraints: {
          audio: true,
          video: true, // Will be ignored for audio-only calls
        },
      },
    });
    
    logger.info(`Call ${callId} answered`);
    
    return true;
  } catch (error) {
    logger.error(`Error answering call: ${error.message}`);
    throw error;
  }
};

/**
 * End a call
 * @param {string} callId - Call ID
 * @returns {boolean} Success status
 */
exports.endCall = async (callId) => {
  try {
    const session = activeSessions.get(callId);
    
    if (!session) {
      throw new Error('Call not found');
    }
    
    // End call based on state
    if (session.state === SessionState.Established) {
      await session.bye();
    } else if (session instanceof Web.Inviter && session.state === SessionState.Establishing) {
      await session.cancel();
    } else if (session instanceof Web.Invitation && session.state === SessionState.Initial) {
      await session.reject();
    }
    
    // Remove from active sessions
    activeSessions.delete(callId);
    
    logger.info(`Call ${callId} ended`);
    
    return true;
  } catch (error) {
    logger.error(`Error ending call: ${error.message}`);
    throw error;
  }
};

/**
 * Get session by call ID
 * @param {string} callId - Call ID
 * @returns {Object|null} SIP session or null if not found
 */
exports.getSession = (callId) => {
  return activeSessions.get(callId) || null;
};

module.exports = exports;