import express from 'express';
import bodyParser from 'body-parser';


import userRoute from './routes/apiRoutes';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/', userRoute);

app.get('/', (req, res) => {
  res.send('working');
});

app.listen(3000, () => {
  console.log('API is running on port 3000');
});
