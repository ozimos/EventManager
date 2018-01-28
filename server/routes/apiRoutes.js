// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import Controller from '../controllers/controller.js';
import EventController from '../controllers/eventController.js';
import UserController from '../controllers/userController.js';
import schemas from '../middleware/validationSchemas.js';
import db from '../models/index.js';

const router = express.Router();
const validator = Validator({});
const centerController = new Controller(db.Center);
const eventController = new EventController(db.Event);
const userController = new UserController(db.User);

// Param validation for all Routes
router.param('id', validator.params(schemas.param));

// Center Routes
router.route('/centers')
  .get(Controller.select(centerController, 'getAllRows'))
  .post(validator.body(schemas.postCenter), Controller.select(centerController, 'createRow'));

router.route('/centers/:id')
  .get(Controller.select(centerController, 'getRowById'))
  .put(validator.body(schemas.updateCenter), Controller.select(centerController, 'updateRow'));

// Event Routes
router.route('/events')
  .get(Controller.select(eventController, 'getAllRows'))
  .post(validator.body(schemas.postEvent), Controller.select(eventController, 'createRow'));

router.route('/events/:id')
  .get(Controller.select(eventController, 'getRowById'))
  .put(validator.body(schemas.updateEvent), Controller.select(eventController, 'updateRow'))
  .delete(Controller.select(eventController, 'deleteRow'));
// User Routes

router.post(
  '/users', validator.body(schemas.postUsers),
  Controller.select(userController, 'signUp')
);

router.post('/users/login', Controller.select(userController, 'login'));

// Return router
export default router;
