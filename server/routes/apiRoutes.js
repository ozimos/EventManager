// Dependencies
import express from 'express';
import {
  celebrate,
  errors
} from 'celebrate';
import centerController from '../controllers/centers';
import eventController from '../controllers/events';
import schemas from '../validators/schemas';

const router = express.Router();

// Routes
router.route('/centers')
  .get(centerController.getAllCenters)
  .post(celebrate(schemas.postCenterSchema), centerController.postCenter);

router.route('/centers/:id')
  .get(centerController.getSingleCenter)
  .put(centerController.updateCenter);

router.route('/events')
  .get(eventController.getAllEvents)
  .post(celebrate(schemas.postEventSchema), eventController.postEvent);

router.route('/events/:id')
  .get(eventController.getSingleEvent)
  .put(eventController.updateEvent)
  .delete(eventController.deleteEvent);

// Return router
export default router;
