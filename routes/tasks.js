// Routes to projects
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');

// Create task
// api/tasks
router.post('/',
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('project', 'Project is required').not().isEmpty()
  ],
  taskController.createTask
);

// Get tasks by project
router.get('/',
  auth,
  taskController.getTasks
);

// Update task
router.put('/:id',
  auth,
  taskController.updateTask
);

// Delete task
router.delete('/:id',
  auth,
  taskController.deleteTask
);

module.exports = router;

