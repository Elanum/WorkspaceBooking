import express from 'express';
import passport from 'passport';
import { captureException } from '@sentry/node';
import Booking from '../models/bookings.model';

const router = express.Router();

router
  .route('/bookings')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (_req, res, next) => {
      Booking.find({ date: { $gte: new Date().setHours(0, 0, 0, 0) } })
        .sort('date')
        .populate('bookedAM')
        .populate('bookedPM')
        .populate({
          path: 'workspace',
          populate: {
            path: 'room',
          },
        })
        .then((bookings) => {
          if (bookings.length === 0) {
            return res.status(404).json({ message: 'No Bookings Found' });
          }
          return res.status(200).json(bookings);
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
  .post(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    async (req, res, next) => {
      const {
        workspace, date, bookedAM, bookedPM,
      } = req.body;
      const update = {};
      if (!workspace) return res.status(400).json({ message: 'Workspace is required' });
      if (bookedAM) update.bookedAM = bookedAM;
      if (bookedPM) update.bookedPM = bookedPM;

      if (!bookedAM && !bookedPM) return res.status(400).json({ message: 'Booking Time (AM / PM) required' });

      let booking = await Booking.findOne({ workspace, date });

      if (!booking) {
        booking = new Booking({ ...req.body });
      } else {
        if (booking.bookedAM && booking.bookedPM) {
          return res
            .status(423)
            .json({ message: `Worksplace is already occupied on ${new Date(date).toLocaleDateString()}` });
        }
        booking.bookedAM = bookedAM || booking.bookedAM;
        booking.bookedPM = bookedPM || booking.bookedPM;
      }

      try {
        await booking
          .save()
          .then((model) => model
            .populate('workspace')
            .populate('bookedAM')
            .populate('bookedPM')
            .execPopulate());
        return res.status(200).json(booking);
      } catch (error) {
        captureException(error);
        return next(error);
      }
    },
    (error, _req, _res, next) => {
      captureException(error);
      next(error);
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

router
  .route('/bookings/:id')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
      const { id } = req.params;
      Booking.findById(id)
        .populate('bookedAM')
        .populate('bookedPM')
        .populate({
          path: 'workspace',
          populate: {
            path: 'room',
          },
        })
        .then((booking) => {
          if (!booking) res.status(404).json({ message: `Booking ${id} Not Found` });
          res.status(200).json(booking);
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
  .delete(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    async (req, res, next) => {
      const { bookedAM, bookedPM } = req.body;
      const { id } = req.params;

      if (!bookedAM && !bookedPM) {
        return res
          .status(400)
          .json({ message: 'Which booking do you want to delete?' });
      }

      const booking = await Booking.findById(id);
      if (bookedAM) booking.bookedAM = null;
      if (bookedPM) booking.bookedPM = null;

      try {
        if (!booking.bookedAM && !booking.bookedPM) {
          await booking.deleteOne();
        } else {
          await booking.save();
        }
        return res.status(200).json(booking);
      } catch (error) {
        captureException(error);
        return next(error);
      }
    },
    (error, _req, _res, next) => {
      captureException(error);
      next(error);
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

export default router;
