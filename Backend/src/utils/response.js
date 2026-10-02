const sendResponse = (res, statusCode, success, message, data = null, error = null) => {
  const responseObj = {
    success,
    message,
  };
  if (data !== null) responseObj.data = data;
  if (error !== null) responseObj.error = error;
  
  return res.status(statusCode).json(responseObj);
};

module.exports = sendResponse;