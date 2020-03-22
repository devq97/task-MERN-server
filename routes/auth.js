// Routes to auth users
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');

// Create an User
// api/auth
router.post('/',
  [
    check('email', 'Add an valid email').isEmail(),
    check('password', 'Password must be minimum 6 characters').isLength({ min: 6 })
  ],
  authController.authenticateUser
);

// Get user authenticated
router.get('/',
  auth,
  authController.getUserLogged
)

module.exports = router;