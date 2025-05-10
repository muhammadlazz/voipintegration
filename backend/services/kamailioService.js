const sipService = require('./sipService');
const logger = require('../utils/logger');
const { ErrorResponse } = require('../middleware/error');
const axios = require('axios');

/**
 * Register user with Kamailio server
 * @param {Object} user - User object
 * @returns {boolean} Success status
 */
exports.register = async (user) => {
  try {
    logger.info(`Registering user ${user.phoneNumber} with Kamailio server`);
    
    // Create SIP user agent
    const userAgent = await sipService.createUserAgent(user);
    
    // Register with SIP server
    await sipService.register(userAgent);
    
    // Update user's registration status
    await user.updateRegistrationStatus('registered');
    
    logger.info(`User ${user.phoneNumber} registered successfully with Kamailio`);
    
    return true;
  } catch (error) {
    logger.error(`Error registering with Kamailio: ${error.message}`);
    throw new ErrorResponse(`Failed to register with Kamailio server: ${error.message}`, 500);
  }
};

/**
 * Check Kamailio server health
 * @returns {Object} Server status
 */
exports.checkServerHealth = async () => {
  try {
    // Configuration from environment variables
    const kamailioHost = process.env.KAMAILIO_HOST;
    const kamailioPort = process.env.KAMAILIO_PORT || 5060;
    
    // For HTTP-based health check (if Kamailio has HTTP monitoring enabled)
    let httpStatus = 'unknown';
    try {
      // This assumes Kamailio has an HTTP monitoring interface
      // Adjust URL as needed based on your Kamailio configuration
      const response = await axios.get(`http://${kamailioHost}:${process.env.KAMAILIO_HTTP_PORT || 8080}/status`);
      httpStatus = response.status === 200 ? 'online' : 'offline';
    } catch (err) {
      httpStatus = 'offline';
      logger.warn(`Kamailio HTTP interface not reachable: ${err.message}`);
    }
    
    // For SIP-based health check
    let sipStatus = 'unknown';
    try {
      // Try to create a temporary user agent to check SIP connectivity
      const tempAgent = await sipService.createTempUserAgent();
      sipStatus = tempAgent ? 'online' : 'offline';
      
      // Clean up temporary agent
      if (tempAgent) {
        await tempAgent.stop();
      }
    } catch (err) {
      sipStatus = 'offline';
      logger.warn(`Kamailio SIP interface not reachable: ${err.message}`);
    }
    
    return {
      status: sipStatus === 'online' ? 'online' : 'offline',
      protocol: 'UDP',
      host: kamailioHost,
      port: kamailioPort,
      details: {
        sip: sipStatus,
        http: httpStatus
      },
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    logger.error(`Error checking Kamailio server health: ${error.message}`);
    throw new ErrorResponse(`Failed to check Kamailio server health: ${error.message}`, 500);
  }
};

/**
 * Add user to Kamailio user database (if needed)
 * @param {Object} userData - User data including phoneNumber and password
 * @returns {boolean} Success status
 */
exports.addUserToKamailio = async (userData) => {
  try {
    // This function depends on how your Kamailio is set up
    // If Kamailio uses an external database, you might add the user there
    // If Kamailio has an API for user management, you would use that
    
    // Example implementation for a Kamailio with REST API for user management
    // (This is hypothetical - adjust based on your actual Kamailio setup)
    /*
    const response = await axios.post(`http://${process.env.KAMAILIO_HOST}:${process.env.KAMAILIO_ADMIN_PORT}/api/subscribers`, {
      username: userData.phoneNumber,
      domain: process.env.KAMAILIO_REALM,
      password: userData.password,
      ha1: userData.ha1Password // Pre-computed HA1 hash if needed
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.KAMAILIO_API_KEY}`
      }
    });
    
    return response.status === 200 || response.status === 201;
    */
    
    
    logger.info(`User would be added to Kamailio: ${userData.phoneNumber}`);
    return true;
  } catch (error) {
    logger.error(`Error adding user to Kamailio: ${error.message}`);
    throw new ErrorResponse(`Failed to add user to Kamailio: ${error.message}`, 500);
  }
};