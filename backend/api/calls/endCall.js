const axios = require('axios');
const { KAMAILIO_API_URL } = process.env;

module.exports = async (req, res) => {
  const { callId } = req.body;

  if (!callId) {
    return res.status(400).json({ error: 'Call ID is required' });
  }

  try {
    // Mengakhiri panggilan dengan Kamailio
    const response = await axios.post(`${KAMAILIO_API_URL}/end_call`, { callId });

    if (response.data.status === 'call_ended') {
      return res.status(200).json({ message: 'Call ended successfully' });
    } else {
      return res.status(500).json({ error: 'Failed to end call' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};