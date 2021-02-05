import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import logger from 'morgan';
import passport from 'passport';
import path from 'path';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import mongoDB from './config/mongoose.config';
import usersRouter from './routes/users.route';
import authRouter from './routes/auth.route';
import roomsRouter from './routes/rooms.route';
import workspacesRouter from './routes/workspaces.route';
import bookingsRouter from './routes/bookings.route';

const { NODE_ENV, SENTRY_SERVER_DSN } = process.env;
const app = express();
const apiPrefix = '/api';
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
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

mongoDB.connect();
if (NODE_ENV !== 'testing') {
  app.use(logger('dev'));
  mongoDB.initData();
}
// mongoDB.initData();

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(limiter);

require('./config/passport.config')(passport);

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
if (NODE_ENV !== 'testing') {
  app.use(Sentry.Handlers.errorHandler());

  app.use((err, _req, res) => {
    res.statusCode = err.status || 500;
    res.json({ message: err.message || res.sentry });
  });
}

export default app;
