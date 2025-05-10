const express = require('express');
const {
  initiateCall,
  answerCall,
  endCall,
  getCallLogs,
} = require('../controllers/callController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// Call routes
router.post('/', initiateCall);
router.post('/:callId/answer', answerCall);
router.post('/:callId/end', endCall);
router.get('/logs', getCallLogs);

module.exports = router;