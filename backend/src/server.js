require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production' && !process.env.CLIENT_URL) {
  console.warn('WARNING: NODE_ENV is production but CLIENT_URL is not set. CORS may block frontend requests.');
}

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Graceful Shutdown
const shutdown = () => {
  console.log('SIGTERM/SIGINT received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
