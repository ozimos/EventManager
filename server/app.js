import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import userRoute from './routes/apiRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/*
app.use(methodOverride((req) => {
  if (req.param.id) {
    return 'PUT';
  }
}));
 */
app.use('/api/v1/', userRoute);

app.get('/', (req, res) => {
  res.send('Welcome To Event manager API!!!');
});

/* eslint no-console: off */
app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});

export default app;
