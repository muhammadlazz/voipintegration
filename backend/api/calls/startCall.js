const axios = require('axios');
const { KAMAILIO_API_URL } = process.env;

module.exports = async (req, res) => {
  const { phoneNumber, callType } = req.body;

  if (!phoneNumber || !callType) {
    return res.status(400).json({ error: 'Phone number and call type are required' });
  }

  try {
    // Inisialisasi panggilan ke Kamailio untuk memulai panggilan
    const response = await axios.post(`${KAMAILIO_API_URL}/start_call`, { phoneNumber, callType });

    if (response.data.status === 'call_started') {
      return res.status(200).json({ message: 'Call started successfully' });
    } else {
      return res.status(500).json({ error: 'Failed to start call' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};