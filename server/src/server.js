import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import mongoose from 'mongoose';
import logger from 'morgan';
import passport from 'passport';
import path from 'path';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import usersRouter from './routes/users.route';
import authRouter from './routes/auth.route';
import roomsRouter from './routes/rooms.route';
import workspacesRouter from './routes/workspaces.route';
import bookingsRouter from './routes/bookings.route';

const {
  DB_URI, NODE_ENV, PORT = 5000, SENTRY_SERVER_DSN,
} = process.env;
const app = express();
const apiPrefix = '/api';
const dbConnection = NODE_ENV === 'production' || NODE_ENV === 'staging'
  ? DB_URI
  : 'mongodb://database:27017/';
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: {
    message: 'Too many requests, please try again later.',
  },
});

Sentry.init({
  dsn: SENTRY_SERVER_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  environment: NODE_ENV || 'development',
  tracesSampleRate: 1.0,
});

mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: NODE_ENV === 'production' ? 'workspace-booking' : 'workspace-booking-dev',
  })
  .then(() => console.log('MongoDB: connection successfull'))
  .catch((error) => console.error(`MongoDB: ${error.message}`));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(limiter);

require('./config/passport.config')(passport);

require('./config/mongoose.init');

app.use(apiPrefix, authRouter);
app.use(apiPrefix, usersRouter);
app.use(apiPrefix, roomsRouter);
app.use(apiPrefix, workspacesRouter);
app.use(apiPrefix, bookingsRouter);

if (NODE_ENV === 'production' || NODE_ENV === 'staging') {
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  });
}

app.use(Sentry.Handlers.errorHandler());

app.use((err, _req, res) => {
  res.statusCode = err.status || 500;
  res.json({ message: err.message || res.sentry });
});

app.listen(PORT, () => console.log(`server started and listening on port ${PORT}!`));

export default app;
