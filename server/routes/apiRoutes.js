// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import Controller from '../controllers/controller.js';
import UserController from '../controllers/userController.js';
import schemas from '../middleware/validationSchemas.js';
import db from '../models/index.js';

const router = express.Router();
const validator = Validator({});
const centerController = new Controller(db.Center);
const eventController = new Controller(db.Event);
const userController = new UserController(db.User);

// Param validation for all Routes
router.param('id', validator.params(schemas.param));

// Center Routes
router.route('/centers')
  .get(centerController.getAllRows)
  .post(validator.body(schemas.postCenter), centerController.createRow);

router.route('/centers/:id')
  .get(centerController.getRowById)
  .put(validator.body(schemas.updateCenter), centerController.updateRow);

// Event Routes
router.route('/events')
  .get(eventController.getAllRows)
  .post(validator.body(schemas.postEvent), eventController.createRow);

router.route('/events/:id')
  .get(eventController.getRowById)
  .put(validator.body(schemas.updateEvent), eventController.updateRow)
  .delete(eventController.deleteRow);

// User Routes

router.post('/users', validator.body(schemas.postUsers), userController.signUp, userController.createRow);

router.post('/users/login', userController.login);

// Return router
export default router;
