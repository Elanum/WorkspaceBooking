import express from 'express';
import Booking from '../models/bookings.model';

const router = express.Router();

router
  .route('/bookings')
  .get((_req, res) => {
    Booking.find().then((bookings) => {
      if (bookings.length === 0) return res.status(404).json({ message: 'No Bookings Found' });
      return res.status(200).json(bookings);
    });
  })
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

module.exports = router;
