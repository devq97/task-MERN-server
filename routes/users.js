// Routes to create Users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

// Create an User
// api/users
router.post('/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Add an valid email').isEmail(),
    check('password', 'Password must be 6 characters').isLength({ min: 6 })
  ],
  userController.createUser
);

module.exports = router;