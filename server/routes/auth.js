import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users';
import passport from 'passport';

const router = express.Router();
const secret = process.env.SECRET || 'jwtsecret';

router
  .route('/login')
  .post(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username }).select('+password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const correctPassword = bcrypt.compare(password, user.password);

    if (!correctPassword)
      return res.status(400).json({ message: 'Password is incorrect' });

    const token = jwt.sign({ id: user._id, username: user.password }, secret);

    if (!token)
      return res
        .status(500)
        .json({ success: false, message: 'Error signing token' });

    return res.status(200).json({ success: true, token });
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

    return res.status(201).json({ message: `${req.body.username} created!` });
  })
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

router
  .route('/password')
  .put(async (req, res) => {
    const username = req.body.username;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    if (!username)
      return res.status(400).json({ message: 'Username is missing' });
    if (!oldPassword)
      return res.status(400).json({ message: 'Old Password is missing' });
    if (!newPassword)
      return res.status(400).json({ message: 'New Password is missing' });

    const user = await User.findOne({ username }).select('+password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const passwordMatch = bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch)
      return res.status(400).json({ message: 'Old password incorrect' });
    user.password = newPassword;
    try {
      await user.save();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    res.status(200).json({ message: 'Password updated' });
  })
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

export default router;
