const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync();

/**
 * Encrypt password of user
 */
const secureUser = user => {
  const { password } = user;
  if (password) {
    user.password = bcrypt.hashSync(password, salt); // eslint-disable-line no-param-reassign
  }

  return user;
};

module.exports = secureUser;
