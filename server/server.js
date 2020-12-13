/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import logger from 'morgan';
// import loginRoute from './routes/login';

const app = express();
const port = process.env.SERVER_PORT || 5000;
const dbPort = process.env.DB_PORT || 27017;
const dbHost = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || 'dev';
const dbConnection = `mongodb://${dbHost}:${dbPort}/${dbName}`;

mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`MongoDB: connected to ${dbConnection}`))
  .catch((error) => console.error(`MongoDB: ${error.message}`));

app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/api/', loginRoute);

app.use((_req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.listen(port, () =>
  console.log(`server started and listening on port ${port}!`),
);

module.exports = app;
