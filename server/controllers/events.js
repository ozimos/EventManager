import express from 'express';
import {
  events
} from '../dummy/data';

const eventsRoutes = express.Router();
eventsRoutes.get('/', res => res.json({
  events,
  errors: false
}));


// class eventController {}
// export {
//   eventController,
//   eventsRoutes
// };
