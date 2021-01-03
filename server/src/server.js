import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import logger from 'morgan';
import passport from 'passport';
import path from 'path';

import usersRouter from './routes/users.route';
import authRouter from './routes/auth.route';
import roomsRouter from './routes/rooms.route';
import workspacesRouter from './routes/workspaces.route';
import bookingsRouter from './routes/bookings.route';

const app = express();
const port = process.env.PORT || process.env.SERVER_PORT || 5000;
const dbPort = process.env.DB_PORT || 27017;
const dbHost = process.env.DB_HOST || 'database';
const dbName = process.env.DB_NAME || 'workspace-booking';
const apiPrefix = '/api';

let dbConnection = `mongodb://${dbHost}:${dbPort}/${dbName}`;

if (process.env.NODE_ENV === 'production') {
  dbConnection = process.env.DB_URI;
}

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

require('./config/mongoose.init');

app.use(apiPrefix, authRouter);
app.use(apiPrefix, usersRouter);
app.use(apiPrefix, roomsRouter);
app.use(apiPrefix, workspacesRouter);
app.use(apiPrefix, bookingsRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  });
}

app.use((_req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.listen(port, () => console.log(`server started and listening on port ${port}!`));

module.exports = app;
