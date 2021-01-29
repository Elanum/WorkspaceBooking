import express from 'express';
import passport from 'passport';
import { captureException } from '@sentry/node';
import Users from '../models/users.model';
import Bookings from '../models/bookings.model';

const router = express.Router();

router
  .route('/users')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (_req, res, next) => {
      Users.find()
        .sort('userId')
        .then((users) => {
          if (users.length === 0) {
            return res.status(404).json({ message: 'No Users Found' });
          }
          return res.status(200).json(users);
        })
        .catch((error) => {
          captureException(error);
          next(error);
        });
    },
    (error, _req, _res, next) => {
      captureException(error);
      next(error);
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

router
  .route('/users/:username')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    async (req, res, next) => {
      Users.findOne({ username: req.params.username })
        .then(async (user) => {
          if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
          }
          const result = user.toJSON();

          result.bookings = await Bookings.find({
            $and: [
              { $or: [{ bookedAM: user }, { bookedPM: user }] },
              { date: { $gte: new Date().setHours(0, 0, 0, 0) } },
            ],
          }).populate({ path: 'workspace', populate: { path: 'room' } });
          delete result.bookingsAM;
          delete result.bookingsPM;
          return res.status(200).json(result);
        })
        .catch((error) => {
          captureException(error);
          next(error);
        });
    },
    (error, _req, _res, next) => {
      captureException(error);
      next(error);
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

export default router;
