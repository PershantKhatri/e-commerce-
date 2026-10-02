const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendResponse = require('../utils/response');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return sendResponse(res, 401, false, 'Not authorized, user not found', null, 'AUTHENTICATION_ERROR');
      }
      return next(); // Return lagana zaroori hai
    } catch (error) {
      return sendResponse(res, 401, false, 'Not authorized, token failed', null, 'TOKEN_ERROR');
    }
  }

  if (!token) {
    return sendResponse(res, 401, false, 'Not authorized, no token provided', null, 'UNAUTHORIZED');
  }
};

module.exports = { protect };