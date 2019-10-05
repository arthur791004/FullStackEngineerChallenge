const generateReview = require('../utils/generateReview');
const users = require('./users');

const reviews = [];

for (let i = 0; i < users.length; i++) {
  for (let j = i + 1; j < users.length; j++) {
    reviews.push(generateReview(users[i], users[j]));
    reviews.push(generateReview(users[j], users[i]));
  }
}

module.exports = reviews;
