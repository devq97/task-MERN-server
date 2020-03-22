const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
  // Validate Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() })
  }

  // Extract email and password
  const { email, password } = req.body;

  try {

    // Validate user register
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Validate password
    const correctPass = await bcryptjs.compare(password, user.password);
    if (!correctPass) {
      return res.status(400).json({ msg: 'Incorrect password'})
    }

    // Create jwt
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign token
    jwt.sign(payload, process.env.SECRET, {
      expiresIn: 3600
    }, (error, token) => {
      if (error) throw error;

      // Confirmation Message
      return res.status(200).json({
        token
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }

};

// Get user logged
exports.getUserLogged = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);

  } catch (error) {

    console.log(error);
    res.status(500).json({ msg: 'Server error' });

  }
};