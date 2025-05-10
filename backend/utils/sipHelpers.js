/**
 * Format phone number to SIP URI
 * @param {string} phoneNumber - Phone number
 * @param {string} domain - SIP domain
 * @returns {string} SIP URI
 */
exports.formatToSipUri = (phoneNumber, domain) => {
  // Remove any non-digit characters
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return `sip:${cleanNumber}@${domain}`;
};

/**
 * Format SIP URI to phone number
 * @param {string} sipUri - SIP URI
 * @returns {string} Phone number
 */
exports.extractPhoneFromUri = (sipUri) => {
  // Extract phone number from SIP URI
  const match = sipUri.match(/sip:([^@]+)@/);
  return match ? match[1] : sipUri;
};

/**
 * Convert call state to human-readable status
 * @param {string} state - Call state
 * @returns {string} Human-readable status
 */
exports.callStateToStatus = (state) => {
  switch (state) {
    case 'calling':
      return 'Calling';
    case 'ringing':
      return 'Ringing';
    case 'start':
      return 'In Call';
    case 'end':
      return 'Call Ended';
    default:
      return state;
  }
};

/**
 * Format call duration
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration (MM:SS)
 */
exports.formatCallDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};