const sipService = require('./sipService');
const logger = require('../utils/logger');
const { ErrorResponse } = require('../middleware/error');

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
    user.updateRegistrationStatus('registered');
    
    logger.info(`User ${user.phoneNumber} registered successfully`);
    
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
    // This is a simplified health check
    // In a real-world scenario, you would do a more comprehensive check
    // by sending SIP OPTIONS or similar
    
    const isReachable = true; // Placeholder for actual check
    
    return {
      status: isReachable ? 'online' : 'offline',
      protocol: 'UDP',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    logger.error(`Error checking Kamailio server health: ${error.message}`);
    throw new ErrorResponse(`Failed to check Kamailio server health: ${error.message}`, 500);
  }
};