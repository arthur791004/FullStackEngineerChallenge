const isAdmin = require('../../ut../../utils/isAdmin');
const permission = require('.');

/**
 * Only allow user with admin role has permission
 */
module.exports = permission(req => {
  const { user } = req.session;

  return isAdmin(user);
});
