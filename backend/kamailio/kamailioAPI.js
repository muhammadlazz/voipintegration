const axios = require('axios');
const { KAMAILIO_API_URL } = process.env;

module.exports.startCall = async (phoneNumber, callType) => {
  return await axios.post(`${KAMAILIO_API_URL}/start_call`, { phoneNumber, callType });
};

module.exports.endCall = async (callId) => {
  return await axios.post(`${KAMAILIO_API_URL}/end_call`, { callId });
};

module.exports.getCallLog = async () => {
  return await axios.get(`${KAMAILIO_API_URL}/get_call_log`);
};