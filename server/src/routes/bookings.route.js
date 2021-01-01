import express from 'express';
import passport from 'passport';
import Booking from '../models/bookings.model';

const router = express.Router();

router
  .route('/bookings')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (_req, res) => {
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

      if (!bookedAM && !bookedPM) {
        return res
          .status(400)
          .json({ message: 'Booking Time (AM / PM) required' });
      }

      let booking = await Booking.findOne({ workspace, date });

      if (!booking) {
        booking = new Booking({ ...req.body });
      } else {
        if (booking.bookedAM && booking.bookedPM) {
          return res
            .status(423)
            .json({ message: `Worksplace is already occupied on ${date}` });
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
        return res.status(500).json({ message: error.message });
      }
    },
    (error, _req, res, _next) => {
      res.status(error.status || 500).json({ message: error.message });
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

router
  .route('/bookings/:id')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res) => {
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
        .then((booking) => res.status(200).json(booking))
        .catch((error) => res.status(500).json({ message: error.message }));
    },
  )
  .delete(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    async (req, res) => {
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
        return res.status(500).json({ message: error.message });
      }
    },
    (error, _req, res, _next) => {
      res.status(error.status || 500).json({ message: error.message });
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

module.exports = router;
