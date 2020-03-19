const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

  // Validate Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Extract email and password
  const { email, password } = req.body;

  try {
    // Evaluate the unique Email
    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        msg: 'The User already exists'
      });
    }

    // Create new User
    user = new User(req.body)

    // Hashing the password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // Save new User
    await user.save();

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
    res.status(500).send('Error Saving User');
  }
};