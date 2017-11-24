import express from 'express';
import {
  centerControllers,
  centerRoutes
} from '../controllers/centers';

import {
  eventControllers,
  eventRoutes
} from '../controllers/events';


const userRoutes = express.Router();

userRoutes.use('/centers', centerRoutes);
// userRoutes.use('/events', eventRoutes);

userRoutes.get('/', res => res.json({
  errors: false
}));

export default userRoutes;
