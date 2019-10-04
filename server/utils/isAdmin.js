const { ROLES } = require('../constants/users');

/**
 * Check the given user is admin or not
 * @param {integer} role - the role of user
 */
const isAdmin = user => user !== undefined && user.role === ROLES.ADMIN;

module.exports = isAdmin;
