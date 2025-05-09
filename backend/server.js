const express = require('express');
const dotenv = require('dotenv');
const loginRouter = require('./api/auth/login');
const callRouter = require('./api/calls/startCall');
const endCallRouter = require('./api/calls/endCall');
const callLogRouter = require('./api/calls/callLog');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Routing
app.use('/api/auth', loginRouter);
app.use('/api/calls', callRouter);
app.use('/api/calls/end', endCallRouter);
app.use('/api/calls/log', callLogRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
