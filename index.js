require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const connectDB = require('./config/db');
const fs = require('fs');
const path = require('path');
const routesPath = path.join(__dirname, 'routes');
//sconst Controller = require('./controllers/getmethod');

console.log('Environment:', process.env.APP);
connectDB();
app.use(express.json());
//app.get('/:id', Controller.getMethod);
//Import Routes
app.get('/ping', (req, res) =>
  res.status(200).send('Server working perfectly')
);

app.use('/viewdept', require('./routes/viewplan'));
app.use('/add', require('./routes/addplan'));
app.use('/maint', require('./routes/maint'));
app.use('/oee', require('./routes/oee'));
app.use('/gapreason', require('./routes/gapreason'));
app.use('/rejection', require('./routes/rejection'));
app.use('/downtime', require('./routes/downTime'));

//routs
fs.readdirSync(routesPath).forEach((file) => {
  const fileName = file;
  const routeName = file.split('.')[0];
  app.use(`/${routeName}s`, require(`./routes/${fileName}`));
});

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
