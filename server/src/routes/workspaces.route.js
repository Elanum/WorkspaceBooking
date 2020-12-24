import express from 'express';
import Workspace from '../models/workspaces.model';

const router = express.Router();

router
  .route('/workspaces')
  .get((_req, res) => {
    Workspace.find()
      .populate('room')
      .then((workspaces) => {
        if (workspaces.length === 0) {
          return res.status(404).json({ message: 'No Workspaces Found' });
        }
        return res.status(200).json(workspaces);
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  })
  .post((req, res) => {
    const workspace = new Workspace({ ...req.body });
    workspace
      .save()
      .then((newWorkspace) => res.status(201).json(newWorkspace))
      .catch((error) => res.status(500).json({ message: error.message }));
  })
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

router
  .route('/workspaces/:id')
  .get((req, res) => {
    Workspace.findOne({ workspaceId: req.params.id })
      .populate('room')
      .then((workspace) => {
        res.status(200).json(workspace);
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  })
  .all((_req, res) => res.status(405).json({ message: 'Method Not Allowed' }));

module.exports = router;
