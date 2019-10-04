const { ERROR_CODES } = require('../constants/errors');

const errorHanlder = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const { code = ERROR_CODES.BAD_REQUEST, message } = error;

  return res.status(code).json({ message });
};

module.exports = errorHanlder;
