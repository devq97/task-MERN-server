const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Read Header Token
  const token = req.header('x-auth-token');

  // Validate Token
  if (!token) {
    return res.status(401).json({ msg: 'Token required' });
  }

  try {

    const verifiedToken = jwt.verify(token, process.env.SECRET);
    req.user = verifiedToken.user
    next();

  } catch (error) {
    res.status(401).json({ msg: 'Invalid Token' })
  }
}