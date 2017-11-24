import express from 'express';
import {
  centers
} from '../dummy/data';

const centerRoutes = express.Router();
centerRoutes.get('/', res => res.json({
  centers,
  errors: false
}));


class centerController {}
// export {
//   centerController,
//   centerRoutes
// };

export default centerRoutes;
