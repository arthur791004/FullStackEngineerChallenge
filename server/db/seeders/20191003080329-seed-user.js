const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync();
const users = Array.from({ length: 10 }, (_, i) => {
  const name = `user${i}`;

  return {
    email: `${name}@paypay.com`,
    password: bcrypt.hashSync(name, salt),
    role: i % 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('Users', users);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
