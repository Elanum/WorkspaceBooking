import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { captureException } from '@sentry/node';
import Users from '../models/users.model';

const { JWT_SECRET = 'jwtsecret' } = process.env;
const router = express.Router();
const expiresIn = 86400;

router
  .route('/login')
  .post(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ username }).select('+password');
    if (!username) {
      return res.status(400).json({ message: 'Please enter a username' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Please enter a password' });
    }
    if (!user) return res.status(404).json({ message: 'Invalid Credentials' });

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    try {
      const token = jwt.sign({ id: user._id, username: user.password }, JWT_SECRET, {
        expiresIn,
      });

      return res.status(200).json({
        username,
        _id: user._id,
        token,
        expiresIn,
        type: 'Bearer',
      });
    } catch (error) {
      captureException(error);
      return next(error);
    }
  })
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

router
  .route('/register')
  .post(async (req, res, next) => {
    const user = new Users({ ...req.body });
    try {
      await user.save();
    } catch (error) {
      captureException(error);
      next(error);
    }
    return res.status(201).json(user);
  })
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

export default router;
