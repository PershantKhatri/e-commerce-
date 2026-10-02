const sendResponse = require('../utils/response');

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return sendResponse(res, 403, false, 'Access denied, admin role required', null, 'FORBIDDEN');
  }
};

module.exports = { admin };