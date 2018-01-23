import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import apiRoutes from './routes/apiRoutes.js';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/v1/', apiRoutes);

app.get('/', (req, res) => {
  res.send('Welcome To Event manager API!!!');
});

export default app;
