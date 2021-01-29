import express from 'express';
import passport from 'passport';
import { captureException } from '@sentry/node';
import Workspace from '../models/workspaces.model';

const router = express.Router();

router
  .route('/workspaces')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (_req, res, next) => {
      Workspace.find()
        .sort('workspaceId')
        .populate('room')
        .populate({
          path: 'bookings',
          match: { date: { $gte: new Date().setHours(0, 0, 0, 0) } },
          populate: [
            {
              path: 'bookedAM',
            },
            {
              path: 'bookedPM',
            },
          ],
        })
        .then((workspaces) => {
          if (workspaces.length === 0) {
            return res.status(404).json({ message: 'No Workspaces Found' });
          }
          return res.status(200).json(workspaces);
        })
        .catch((error) => {
          captureException(error);
          next(error);
        });
    },
    (error, _req, res, _next) => {
      res.status(error.status || 500).json({ message: error.message });
    },
  )
  .post(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
      const workspace = new Workspace({ ...req.body });
      workspace
        .save()
        .then((newWorkspace) => res.status(201).json(newWorkspace))
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
  .route('/workspaces/:id')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
      Workspace.findOne({ workspaceId: req.params.id })
        .sort('workspaceId')
        .populate('room')
        .populate({
          path: 'bookings',
          options: {
            sort: 'date',
          },
          populate: {
            path: 'user',
          },
        })
        .then((workspace) => {
          if (!workspace) return res.status(404).json({ message: `Workspace ${req.params.id} Not Found` });
          return res.status(200).json(workspace);
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
