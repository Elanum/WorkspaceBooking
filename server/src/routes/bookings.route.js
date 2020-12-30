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
        .catch((error) => res.status(500).json({ message: error.message }));
    },
    (error, _req, res, _next) => {
      res.status(error.status || 500).json({ message: error.message });
    },
  )
  .post(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    async (req, res) => {
      const {
        workspace, date, bookedAM, bookedPM,
      } = req.body;
      const update = {};
      if (bookedAM) update.bookedAM = bookedAM;
      if (bookedPM) update.bookedPM = bookedPM;

      let booking = await Booking.findOne({ workspace, date });

      if (!booking) {
        booking = new Booking({ ...req.body });
      } else {
        if (booking.bookedAM && booking.bookedPM) {
          return res.status(423).json({ message: `Worksplace is already occupied on ${date}` });
        }
        booking.bookedAM = bookedAM || booking.bookedAM;
        booking.bookedPM = bookedPM || booking.bookedPM;
      }

      try {
        await booking.save();
        return res.status(200).json(booking);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    },
    (error, _req, res, _next) => {
      res.status(error.status || 500).json({ message: error.message });
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

module.exports = router;
