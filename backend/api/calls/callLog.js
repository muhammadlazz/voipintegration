const axios = require('axios');
const { KAMAILIO_API_URL } = process.env;

module.exports = async (req, res) => {
  try {
    // Mendapatkan riwayat panggilan dari Kamailio
    const response = await axios.get(`${KAMAILIO_API_URL}/get_call_log`);

    if (response.data) {
      return res.status(200).json({ callLogs: response.data });
    } else {
      return res.status(500).json({ error: 'Failed to retrieve call logs' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};