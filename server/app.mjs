import express from 'express';
import bodyParser from 'body-parser';
// import methodOverride from 'method-override';


import userRoute from './routes/apiRoutes.mjs';

const app = express();


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
  res.send('working');
});

app.listen(3000, () => {
  console.log('API is running on port 3000');
});
