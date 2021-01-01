import express from 'express';
import passport from 'passport';
import Users from '../models/users.model';
import Bookings from '../models/bookings.model';

const router = express.Router();

router
  .route('/users')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (_req, res) => {
      Users.find()
        .sort('userId')
        .then((users) => {
          if (users.length === 0) {
            return res.status(404).json({ message: 'No Users Found' });
          }
          return res.status(200).json(users);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
    },
    (error, _req, res, _next) => {
      res.status(error.status || 500).json({ message: error.message });
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

router
  .route('/users/:username')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    async (req, res) => {
      const today = new Date();
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
        .catch((error) => res.status(500).json({ message: error.message }));
    },
    (error, _req, res, _next) => {
      res.status(error.status || 500).json({ message: error.message });
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

module.exports = router;
