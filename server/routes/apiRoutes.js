// Dependencies
import express from 'express';
import centerController from '../controllers/centers';
import eventController from '../controllers/events';

const router = express.Router();

// Routes
router.route('/centers')
  .get(centerController.getAllCenters)
  .post(centerController.postCenter);

export default router;
