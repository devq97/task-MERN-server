// Routes to projects
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');

// Create new project
// api/projects
router.post('/',
  auth,
  [
    check('name', 'Project name is required').not().isEmpty()
  ],
  projectController.createProject
);

// Get all projects
router.get('/',
  auth,
  projectController.getProjects
);

// Update project
router.put('/:id',
  auth,
  [
    check('name', 'Project name is required').not().isEmpty()
  ],
  projectController.updateProject
);

// Delete project
router.delete('/:id',
  auth,
  projectController.deleteProject
);

module.exports = router;