import express from 'express';
import passport from 'passport';
import { captureException } from '@sentry/node';
import Room from '../models/rooms.model';

const router = express.Router();

router
  .route('/rooms')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (_req, res, next) => {
      Room.find()
        .sort('roomId')
        .populate('workspaces')
        .then((rooms) => {
          if (rooms.length === 0) {
            return res.status(404).json({ message: 'No Rooms Found' });
          }
          return res.status(200).json(rooms);
        })
        .catch((error) => {
          captureException(error);
          next(error);
        });
    },
    (error, _req, _res, next) => {
      captureException(error);
      next(error);
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

router
  .route('/rooms/:id')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
      Room.findOne({ roomId: req.params.id })
        .sort('roomId')
        .populate('workspaces')
        .then((room) => {
          if (!room) return res.status(404).json({ message: `Room ${req.params.id} Not Found` });
          return res.status(200).json(room);
        })
        .catch((error) => {
          captureException(error);
          next(error);
        });
    },
    (error, _req, _res, next) => {
      captureException(error);
      next(error);
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

export default router;
