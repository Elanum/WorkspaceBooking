import express from 'express';
import passport from 'passport';
import Room from '../models/rooms.model';

const router = express.Router();

router
  .route('/rooms')
  .get((_req, res) => {
    Room.find()
      .populate('workspaces')
      .then((rooms) => {
        if (rooms.length === 0) return res.status(404).json({ message: 'No Rooms Found' });
        return res.status(200).json(rooms);
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  })
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

router
  .route('/rooms/:id')
  .get((req, res) => {
    Room.findOne({ roomId: req.params.id })
      .populate('workspaces')
      .then((room) => {
        res.status(200).json(room);
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  })
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

module.exports = router;
