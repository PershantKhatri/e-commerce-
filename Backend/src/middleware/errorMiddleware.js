const sendResponse = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    message = 'Resource not found with the provided ID.';
    statusCode = 404;
  }

  if (err.code === 11000) {
    message = 'Email or field value is already registered.';
    statusCode = 409;
  }

  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(val => val.message).join(', ');
    statusCode = 400;
  }

  // Agar next function available hai, tabhi use karein ya direct sendResponse bhej dein
  return sendResponse(res, statusCode, false, message, null, err.name || 'SERVER_ERROR');
};

module.exports = { errorHandler };