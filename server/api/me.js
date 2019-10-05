const { Router } = require('express');
const { sequelize } = require('../db/models');

const router = Router();

/**
 * Get me
 */
router.get('/', (req, res) => {
  return res.json({ data: req.session.user });
});

/**
 * Get requiring reviews
 */
router.get('/requiringReviews', (req, res, next) => {
  const { id } = req.session.user;
  const replacements = { reviewerId: id };
  const type = sequelize.QueryTypes.SELECT;
  const query = `
    select
      Reviews.id as id,
      Reviews.rating as rating,
      Reviews.content as content,
      Reviews.createdAt as createdAt,
      Reviews.updatedAt as updatedAt,
      Users.email as reviewee
    from Reviews
    left join Users
    on Reviews.revieweeId = Users.id
    where Reviews.reviewerId = :reviewerId
  `;

  return sequelize
    .query(query, { replacements, type })
    .then(requiringReviews => res.json({ data: requiringReviews }))
    .catch(error => next({ message: error.message }));
});

/**
 * Get feedbacks from other users
 */
router.get('/feedbacks', (req, res, next) => {
  const { id } = req.session.user;
  const replacements = { revieweeId: id };
  const type = sequelize.QueryTypes.SELECT;
  const query = `
    select
      Reviews.id as id,
      Reviews.rating as rating,
      Reviews.content as content,
      Reviews.createdAt as createdAt,
      Reviews.updatedAt as updatedAt,
      Users.email as reviewer
    from Reviews
    left join Users
    on Reviews.reviewerId = Users.id
    where Reviews.revieweeId = :revieweeId
  `;

  return sequelize
    .query(query, { replacements, type })
    .then(feedbacks => res.json({ data: feedbacks }))
    .catch(error => next({ message: error.message }));
});

module.exports = router;
