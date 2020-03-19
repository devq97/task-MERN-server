const User = require('../models/User');
const bcryptjs = require('bcryptjs');

exports.createUser = async (req, res) => {

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

    // Hash to the password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // Save new User
    await user.save();

    // Confirmation Message
    return res.status(200).json({
      msg: 'User created'
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error Saving User');
  }
};