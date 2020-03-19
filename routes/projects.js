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

router.get('/',
  auth,
  projectController.createProject
);

module.exports = router;