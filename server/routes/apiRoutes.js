// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import centerController from '../controllers/centers';
import eventController from '../controllers/events';
import schemas from '../validators/schemas';

const router = express.Router();
const validator = Validator({});

// Routes
router.route('/centers')
  .get(centerController.getAllCenters)
  .post(validator.body(schemas.postCenter), centerController.postCenter);

router.route('/centers/:id')
  .get(validator.param(schemas.param), centerController.getSingleCenter)
  .put(validator.param(schemas.param), validator.body(schemas.updateCenter), centerController.updateCenter);

router.route('/events')
  .get(eventController.getAllEvents)
  .post(validator.body(schemas.postEvent), eventController.postEvent);

router.route('/events/:id')
  .get(validator.param(schemas.param), eventController.getSingleEvent)
  .put(validator.param(schemas.param), validator.body(schemas.updateEvent), eventController.updateEvent)
  .delete(validator.param(schemas.param), eventController.deleteEvent);


// Return router
export default router;
