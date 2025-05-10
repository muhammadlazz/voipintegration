const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/error');
const authRoutes = require('./routes/authRoutes');
const callRoutes = require('./routes/callRoutes');
const healthRoutes = require('./routes/healthRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware for development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/calls', callRoutes);
app.use('/api/health', healthRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to VoIP Kamailio Integration API',
    status: 'online'
  });
});

// Error handler
app.use(errorHandler);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;