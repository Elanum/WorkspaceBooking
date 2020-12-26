import express from 'express';
import passport from 'passport';
import Workspace from '../models/workspaces.model';

const router = express.Router();

router
  .route('/workspaces')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (_req, res) => {
      Workspace.find()
        .sort('workspaceId')
        .populate('room')
        .populate('bookings')
        .then((workspaces) => {
          if (workspaces.length === 0) {
            return res.status(404).json({ message: 'No Workspaces Found' });
          }
          return res.status(200).json(workspaces);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
    },
    (error, _req, res, _next) => {
      res.status(error.status || 500).json({ message: error.message });
    },
  )
  .post(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res) => {
      const workspace = new Workspace({ ...req.body });
      workspace
        .save()
        .then((newWorkspace) => res.status(201).json(newWorkspace))
        .catch((error) => res.status(500).json({ message: error.message }));
    },
    (error, _req, res, _next) => {
      res.status(error.status || 500).json({ message: error.message });
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

router
  .route('/workspaces/:id')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res) => {
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
          res.status(200).json(workspace);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
    },
    (error, _req, res, _next) => {
      res.status(error.status || 500).json({ message: error.message });
    },
  )
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

module.exports = router;
