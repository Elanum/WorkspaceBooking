import express from 'express';
import passport from 'passport';
import Booking from '../models/bookings.model';

const router = express.Router();

router
  .route('/bookings')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (_req, res) => {
      Booking.find()
        .sort('date')
        .populate('user')
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
        .catch((error) => res.status(500).json({ message: error.message }));
    },
    (error, _req, res, _next) => {
      res.status(error.status || 500).json({ message: error.message });
    },
  )
  .post(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    async (req, res) => {
      const booking = new Booking({ ...req.body });
      try {
        await booking.save();
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(201).json(booking);
    },
    (error, _req, res, _next) => {
      res.status(error.status || 500).json({ message: error.message });
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

module.exports = router;
