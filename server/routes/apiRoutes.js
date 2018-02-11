// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import Controller from '../controllers/controller.js';
import EventController from '../controllers/eventController.js';
import UserController from '../controllers/userController.js';
import IsUser from '../middleware/authenticate.js';
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
  .post(IsUser.verify, IsUser.admin, validator.body(schemas.postCenter), Controller.select(centerController, 'createRow'));

router.route('/centers/:id')
  .get(Controller.select(centerController, 'getRowById'))
  .put(IsUser.verify, IsUser.admin, validator.body(schemas.updateCenter), Controller.select(centerController, 'updateRow'));

// Event Routes
router.route('/events')
  .get(EventController.select(eventController, 'getAllRows'))
  .post(IsUser.verify, validator.body(schemas.postEvent), EventController.select(eventController, 'createRow'));

router.route('/events/:id')
  .get(EventController.select(eventController, 'getRowById'))
  .put(IsUser.verify, validator.body(schemas.updateEvent), EventController.select(eventController, 'updateRow'))
  .delete(IsUser.verify, EventController.select(eventController, 'deleteRow'));

// User Routes
router.post(
  '/users', validator.body(schemas.postUsers),
  UserController.select(userController, 'signUp')
);

router.post('/users/login', UserController.select(userController, 'login'));

// Return router
export default router;