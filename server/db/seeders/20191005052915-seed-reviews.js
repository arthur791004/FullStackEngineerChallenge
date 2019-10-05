const reviews = require('../mockData/reviews');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('Reviews', reviews);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Reviews', null, {});
  },
};
