/**
 * Kamailio server configuration
 */
module.exports = {
  // Server connection info
  server: {
    host: process.env.KAMAILIO_HOST || 'localhost',
    port: process.env.KAMAILIO_PORT || 5060,
    protocol: 'UDP', // Using UDP as required in the specifications
    wsPort: process.env.KAMAILIO_WS_PORT || 8088, // WebSocket port if needed
  },
  
  // Authentication parameters
  auth: {
    realm: process.env.KAMAILIO_REALM || 'kamailio.local',
    userField: 'phoneNumber', // Using phone number as the username
  },
  
  // SIP settings
  sip: {
    expiresTime: 3600, // Registration expiration in seconds
    userAgentString: 'VoIP-Web-Client/1.0.0',
    dtmfType: 'info', // Type of DTMF signaling
  },
  
  // Media settings
  media: {
    audio: {
      enabled: true,
      codecs: ['opus', 'PCMA', 'PCMU'], // Supported audio codecs
    },
    video: {
      enabled: true,
      codecs: ['VP8', 'VP9', 'H264'], // Supported video codecs
    },
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }, // STUN server for NAT traversal
    ],
  },
  
  // Call settings
  call: {
    defaultTimeout: 60, // Call timeout in seconds
    ringTimeout: 30, // Ring timeout in seconds
  },
};