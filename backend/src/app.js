const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

// Security Headers
app.use(helmet());

// CORS Configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// JSON parsing
app.use(express.json());

// Rate Limiting for Health Check (and future APIs)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: { message: 'Too many requests, please try again later.' } }
});

app.use('/api/', apiLimiter);
app.use('/api/health', healthRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('API Error:', err.message);
  res.status(err.status || 500).json({
    error: {
      message: process.env.NODE_ENV === 'production' 
        ? 'Something went wrong.' 
        : err.message
    }
  });
});

module.exports = app;
