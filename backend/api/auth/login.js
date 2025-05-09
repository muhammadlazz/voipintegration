const axios = require('axios');
const { KAMAILIO_API_URL } = process.env;

module.exports = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    // Lakukan validasi login di sini menggunakan Kamailio API
    const response = await axios.post(`${KAMAILIO_API_URL}/validate_user`, { phoneNumber });

    if (response.data.status === 'valid') {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Invalid phone number' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};