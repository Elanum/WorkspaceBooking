import express from 'express';
import passport from 'passport';
import User from '../models/users';

const router = express.Router();

router
  .route('/users')
  .get(async (_req, res) => {
    User.find()
      .then((users) => {
        if (!users) return res.status(404).json({ message: 'No users stored' });
        return res.status(200).json(users);
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  })
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

router
  .route('/users/:username')
  .get(async (req, res) => {
    User.findOne({ username: req.params.username })
      .then((user) => {
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(user);
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  })
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

module.exports = router;
