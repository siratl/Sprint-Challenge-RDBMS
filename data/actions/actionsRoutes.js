const express = require('express');

const actions = require('./actionsModel.js');

const router = express.Router();

//=============== ACTIONS ENDPOINTS =============== //

// get a list of actions
router.get('/', (req, res) => {
  actions
    .getAction()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => res.status(500).json(err));
});

//get an action by its ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const action = await actions.getActionById(id);

    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({
        message: `Action with specified id: ${req.params.id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add an action
router.post('/', (req, res) => {
  const { project_id, description, notes } = req.body;
  const action = { project_id, description, notes };

  if (!project_id || !description || !notes) {
    return res.status(400).json({
      error: 'project_id, description and notes are REQUIRED for your action.',
    });
  }
  actions
    .addAction(action)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
