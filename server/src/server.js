import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import logger from 'morgan';
import passport from 'passport';
import usersRouter from './routes/users.route';
import authRouter from './routes/auth.route';
import roomsRouter from './routes/rooms.route';
import workspacesRouter from './routes/workspaces.route';
import bookingsRouter from './routes/bookings.route';

const app = express();
const port = process.env.SERVER_PORT || 5000;
const dbPort = process.env.DB_PORT || 27017;
const dbHost = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || 'dev';
const dbConnection = `mongodb://${dbHost}:${dbPort}/${dbName}`;
const apiPrefix = '/api';

mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB: connected to ${dbConnection}`))
  .catch((error) => console.error(`MongoDB: ${error.message}`));

app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

require('./config/passport.config')(passport);

require('./defaults/users.defaults');
require('./defaults/rooms.defaults');

app.use(apiPrefix, authRouter);
app.use(apiPrefix, usersRouter);
app.use(apiPrefix, roomsRouter);
app.use(apiPrefix, workspacesRouter);
app.use(apiPrefix, bookingsRouter);

app.use((_req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.listen(port, () => console.log(`server started and listening on port ${port}!`));

module.exports = app;
