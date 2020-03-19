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