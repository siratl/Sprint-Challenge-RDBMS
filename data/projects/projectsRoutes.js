const express = require('express');

const actions = require('../actions/actionsModel');
const projects = require('./projectsModel');

const router = express.Router();

//******************* PROJECTS ENDPOINTS ******************* //

// get a list of projects
router.get('/', (req, res) => {
  projects
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => res.status(500).json(err));
});

//************* Get project by ID ****************/
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const project = await projects.getById(id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({
        message: `Project with spacified id: ${req.params.id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get actions of a specific project
router.get('/:id/actions', (req, res) => {
  projects
    .getActionByProject(req.params.id)
    .then(action => {
      if (action.length > 0) {
        res.json(action);
      } else
        res.status(404).json({
          message: `The action with the specified project ID: ${
            req.params.id
          } does not exist.`,
        });
    })
    .catch(err =>
      res.status(500).json({
        error: 'The action could not be retrieved.',
      }),
    );
});

// Add a project
router.post('/', (req, res) => {
  const { name, description } = req.body;
  const project = { name, description };

  if (!name || !description) {
    return res.status(400).json({
      error: 'A name and description are REQUIRED for your project.',
    });
  }
  projects
    .add(project)
    .then(ids => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update a project
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  projects
    .update(id, changes)
    .then(project => {
      if (!project) {
        res.status(404).json({ message: 'project NOT found' });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(err => res.status(500).json(err));
});

// delete a project
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  projects
    .remove(id)
    .then(project => {
      if (!project) {
        res.status(404).json({
          message: `Project wit specified id: ${req.params.id} not found.`,
        });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
