const permission = require('.');

/**
 * Only allow self has permission
 * @param {function} getUserId - get userId from request
 */
module.exports = getUserId =>
  permission(req => {
    const userId = getUserId(req);
    const { user } = req.session;

    return user !== undefined && user.id === userId;
  });
