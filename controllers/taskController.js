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
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Get all task by project
exports.getTasks = async (req, res) => {

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
    
    // Get tasks by project
    const tasks = await Task.find({ project });
    res.json({ tasks });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {

    // Extract project
    const { project, name, status } = req.body;

    // Check if task exists
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    const existProject = await Project.findById(project);

    // Check if project is related with user
    if (existProject.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    // Create an object with new info
    const newTask = {};
    (name) ? newTask.name = name : null;
    (status) ? newTask.status = status : null;

    // Save task
    task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true });
    res.status(200).json({ task });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {

    // Extract project
    const { project } = req.body;

    const existProject = await Project.findById(project);

    // Check if task exists
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if project is related with user
    if (existProject.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    // Delete task
    await Task.findOneAndRemove({ _id: req.params.id });
    res.status(200).json('Task Deleted');

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
}