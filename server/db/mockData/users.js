const generateUser = require('../utils/generateUser');

const users = Array.from({ length: 10 }, (_, i) =>
  generateUser(`user${i + 1}`)
);

module.exports = users;
