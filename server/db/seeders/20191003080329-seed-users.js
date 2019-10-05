const secureUser = require('../utils/secureUser');
const admin = require('../mockData/admin');
const users = require('../mockData/users');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'Users',
      [admin, ...users].map(user => secureUser(user))
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
