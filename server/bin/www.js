import http from 'http';
import dotenv from 'dotenv';
import app from '../app.js';
import logger from '../logger.js';


dotenv.config();

// Get port from environment and store in Express.
const PORT = parseInt(process.env.PORT, 10) || 3000;
app.set('port', PORT);
const server = http.createServer(app);

server.listen(PORT, () => {
  logger.debug(`API is running on port ${PORT}`);
});