import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import apiRoutes from './routes/apiRoutes.js';


const app = express();

app.use(morgan('combined', {
  skip(req, res) {
    return res.statusCode < 400;
  },
  stream: process.stderr
}));

app.use(morgan('combined', {
  skip(req, res) {
    return res.statusCode >= 400;
  },
  stream: process.stdout
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/v1/', apiRoutes);

app.get('/', (req, res) => {
  res.send('Welcome To Event manager API!!!');
});

export default app;