// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import centerController from '../controllers/centers.js';
import eventController from '../controllers/events.js';
import schemas from '../validators/schemas.js';

// options to pass to Validator in line 20 to setup custom error messages
// and extra joi options. check joi and express-joi docs for options
// also uncomment lines 43+

// const joiOpts = {
//   convert: true
// allowUnknown: false
// abortEarly: false
// };

// const options = {
//   passError: true,
//   joi: joiOpts
// };

const router = express.Router();
const validator = Validator({});

// Routes
router.route('/centers')
  .get(centerController.getAllCenters)
  .post(validator.body(schemas.postCenter), centerController.postCenter);

router.route('/centers/:id')
  .get(validator.params(schemas.param), centerController.getSingleCenter)
  .put(validator.params(schemas.param), validator.body(schemas.updateCenter), centerController.updateCenter);

router.route('/events')
  .get(eventController.getAllEvents)
  .post(validator.body(schemas.postEvent), eventController.postEvent);

router.route('/events/:id')
  .get(validator.params(schemas.param), eventController.getSingleEvent)
  .put(validator.params(schemas.param), validator.body(schemas.updateEvent), eventController.updateEvent)
  .delete(validator.params(schemas.param), eventController.deleteEvent);

// Custom Express Error handler
// router.use((err, req, res, next) => {
//   if (err.error.isJoi) {
//     // we had a joi error, let's return a custom 400 json response
//     res.status(400).json({
//       type: err.type, // will be "query" here, but could be "headers", "body", or "params"
//       message: err.error.toString()
//     });
//   } else {
//     // pass on to another error handler
//     next(err);
//   }
// });


// Return router
export default router;