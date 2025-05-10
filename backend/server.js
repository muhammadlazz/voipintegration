require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/database');
const logger = require('./utils/logger');
const socketIO = require('./websocket');

// Connect to database
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server
socketIO.init(server);

// Set port
const PORT = process.env.PORT || 5000;

// Start server
server.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});