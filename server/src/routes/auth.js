import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/users';

const router = express.Router();
const secret = process.env.SECRET || 'jwtsecret';
const expiresIn = 86400;

router
  .route('/login')
  .post(async (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    const user = await User.findOne({ username }).select('+password');
    if (!user) return res.status(404).json({ message: 'User Not Found' });

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) { return res.status(400).json({ message: 'Password is incorrect' }); }

    const token = jwt.sign({ id: user._id, username: user.password }, secret, {
      expiresIn,
    });

    if (!token) return res.status(500).json({ message: 'Error signing token' });

    return res.status(200).json({ token, expiresIn, type: 'Bearer' });
  })
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

router
  .route('/register')
  .post(async (req, res) => {
    const user = new User({ ...req.body });
    try {
      await user.save();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
    delete user._doc.password;
    return res.status(201).json(user);
  })
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

router
  .route('/change-password')
  .put(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    async (req, res) => {
      const { username, oldPassword, newPassword } = req.body;

      if (!username) { return res.status(400).json({ message: 'Username is missing' }); }
      if (!oldPassword) { return res.status(400).json({ message: 'Old Password is missing' }); }
      if (!newPassword) { return res.status(400).json({ message: 'New Password is missing' }); }

      const user = await User.findOne({ username }).select('+password');

      if (!user) return res.status(404).json({ message: 'User not found' });
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);

      if (!passwordMatch) { return res.status(400).json({ message: 'Old password incorrect' }); }

      user.password = newPassword;
      try {
        await user.save();
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(200).json({ message: 'Password updated' });
    },
    (error, _req, res, _next) => res.status(error.status || 500).json({ message: error.message }),
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

module.exports = router;
