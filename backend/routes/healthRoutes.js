const express = require('express');
const { checkHealth, checkConnectivity } = require('../controllers/healthController');

const router = express.Router();

// Health check routes
router.get('/', checkHealth);
router.get('/connectivity', checkConnectivity);

module.exports = router;