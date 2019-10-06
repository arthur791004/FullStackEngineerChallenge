const { Router } = require('express');
const { ERROR_CODES, ERROR_MESSAGES } = require('../constants/errors');
const { ROLES } = require('../constants/users');
const { Users } = require('../db/models');
const adminPermission = require('../middlewares/permission/admin');

const router = Router();

/**
 * Login by email and password
 * @param {string} email
 * @param {string} password
 */
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  const where = { email };

  // delete user from session
  delete req.session.user;

  return Users.findOne({ where })
    .then(user => {
      if (!(user && user.checkPassword(password))) {
        return next({
          code: ERROR_CODES.UNAUTHORIZED,
          message: ERROR_MESSAGES.LOGIN_FAILED,
        });
      }

      const data = user.get();

      // add user to session if password is the same
      req.session.user = data;

      return res.json({ data });
    })
    .catch(error => next({ message: error.message }));
});

/**
 * Logout
 */
router.post('/logout', (req, res) => {
  // delete user from session
  delete req.session.user;

  return res.status(200).json();
});

/**
 * Get all users
 */
router.get('/', (req, res, next) => {
  return Users.findAll()
    .then(users => users.map(user => user.get()))
    .then(users => res.json({ data: users }))
    .catch(error => next({ message: error.message }));
});

/**
 * Create a new user (admin only)
 * @param {string} email
 * @param {string} password
 * @param {integer} role
 */
router.post('/', adminPermission, (req, res, next) => {
  const { email, password, role = ROLES.NORMAL } = req.body;

  return Users.create({ email, password, role: Number(role) })
    .then(user => res.json({ data: user.get() }))
    .catch(error => next({ message: error.message }));
});

/**
 * Read a user by userId
 * @param {string} userId
 */
router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;

  return Users.findByPk(userId)
    .then(user => res.json({ data: user.get() }))
    .catch(error => next({ message: error.message }));
});

/**
 * Update a user by userId (admin only)
 * @description Only password could be updated by target user, but it should use `changePassword`
 *   api to change the password. Therefore, I add admin permission to this api now.
 * @param {string} userId
 */
router.patch('/:userId', adminPermission, (req, res, next) => {
  const { userId } = req.params;
  const { role } = req.body;

  return Users.findByPk(userId)
    .then(user => user.update({ role: Number(role) }))
    .then(user => res.json({ data: user.get() }))
    .catch(error => next({ message: error.message }));
});

/**
 * Delete a user by userId (admin only)
 * @param {string} userId
 */
router.delete('/:userId', adminPermission, (req, res, next) => {
  const { userId } = req.params;

  return Users.findByPk(userId)
    .then(user => user.destroy())
    .then(user => res.json({ data: user.get() }))
    .catch(error => next({ message: error.message }));
});

module.exports = router;
