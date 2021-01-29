import express from 'express';
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

const app = express();
const port = process.env.PORT || process.env.SERVER_PORT || 5000;
const dbPort = process.env.DB_PORT || 27017;
const dbHost = process.env.DB_HOST || 'database';
const dbName = process.env.DB_NAME || 'workspace-booking';
const apiPrefix = '/api';

Sentry.init({
  dsn: process.env.SENTRY_SERVER_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

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

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
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

app.use(Sentry.Handlers.errorHandler());

app.use((err, _req, res, _next) => {
  res.statusCode = err.status || 500;
  res.json({ message: err.message || res.sentry });
});

app.listen(port, () => console.log(`server started and listening on port ${port}!`));

export default app;
