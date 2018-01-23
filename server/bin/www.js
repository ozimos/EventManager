import http from 'http';
import dotenv from 'dotenv';
import app from '../app.js';

dotenv.config();

// Get port from environment and store in Express.
const PORT = process.env.PORT || 3000;
app.set('port', PORT);
const server = http.createServer(app);

/* eslint no-console: off */
server.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});
