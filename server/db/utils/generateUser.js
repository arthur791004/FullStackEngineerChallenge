const uuidv4 = require('uuid/v4');
const { ROLES } = require('../../constants/users');

/**
 * Utils for generate fake user
 */
const generateUser = (name, role = ROLES.NORMAL) => ({
  id: uuidv4(),
  email: `${name}@fake.com`,
  password: name,
  role,
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

module.exports = generateUser;
