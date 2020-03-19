const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

// Create task
exports.createTask = async (req, res) => {

  // Validate Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {

    // Extract project
    const { project } = req.body;

    const existProject = await Project.findById(project);
    if (!existProject) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check if project is related with user
    if (existProject.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    // Create task
    const task = new Task(req.body);
    await task.save();
    res.json({ task })

  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
};