const { ERROR_CODES } = require('../../constants/errors');

/**
 * Check permission by given validate function
 * @param {integer} role - Only specified role has permission
 */
const permission = (...validators) => (req, res, next) => {
  if (!req.session.user) {
    return next({ code: ERROR_CODES.UNAUTHORIZED });
  }

  const passed = validators.some(validator => validator(req));
  if (!passed) {
    return next({
      code: ERROR_CODES.FORBIDDEN,
    });
  }

  return next();
};

module.exports = permission;
