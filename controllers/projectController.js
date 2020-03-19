const Project = require('../models/Project');
const { validationResult } = require('express-validator')

exports.createProject = async (req, res) => {

  // Validate Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {

    // Create new project
    const project = new Project(req.body);

    // Save creator from jwt
    project.creator = req.user.id

    // Save project
    project.save();
    res.json(project);

  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
};

// Get projects for user
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ creator: req.user.id }).sort({ creator: -1 });
    res.status(200).json({ projects });

  } catch (error) {
    res.status(500).send('Error');
  }
};

// Update project
exports.updateProject = async (req, res) => {

  // Validate Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Extract project info
  const { name } = req.body;
  const newProject = {};
  if (name) {
    newProject.name = name;
  }

  try {

    // Check ID
    let project = await Project.findById(req.params.id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Verify creator
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    // Update project
    project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });
    res.json({project});

  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
};

// Delete project
exports.deleteProject = async (req, res) => {

  try {
    // Check ID
    let project = await Project.findById(req.params.id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Verify creator
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    // Delete project
    await Project.findOneAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: 'Project deleted' });

  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
};