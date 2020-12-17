import express from 'express';
import passport from 'passport';
import User from '../models/users';

const router = express.Router();

router
  .route('/users')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    async (_req, res) => {
      User.find()
        .then((users) => {
          if (!users) return res.status(404).json({ message: 'Users Not Found' });
          return res.status(200).json(users);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
    },
    (error, _req, res, _next) => res.status(error.status || 500).json({ message: error.message }),
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

router
  .route('/users/:username')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    async (req, res) => {
      User.findOne({ username: req.params.username })
        .then((user) => {
          if (!user) return res.status(404).json({ message: 'User Not Found' });
          return res.status(200).json(user);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
    },
    (error, _req, res, _next) => {
      res.status(error.status || 500).json({ message: error.message });
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

module.exports = router;
