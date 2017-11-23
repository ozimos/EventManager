import express from 'express';
import userRoute from './routes/apiRoutes';

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api/v1/', userRoute);

app.get('/', (req, res) => {
  res.send('working');
});

app.listen(3005, () => {
  console.log('API is running on port 3005');
});
