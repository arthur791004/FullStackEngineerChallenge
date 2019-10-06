const { Router } = require('express');
const { Reviews, Users } = require('../db/models');

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
  const options = {
    where: {
      reviewerId: id,
    },
    include: [
      {
        model: Users,
        as: 'reviewee',
      },
    ],
  };

  return Reviews.findAll(options)
    .then(reviews => reviews.map(review => review.get({ plain: true })))
    .then(reviews => res.json({ data: reviews }))
    .catch(error => next({ message: error.message }));
});

/**
 * Get feedbacks from other users
 */
router.get('/feedbacks', (req, res, next) => {
  const { id } = req.session.user;
  const options = {
    where: {
      revieweeId: id,
    },
    include: [
      {
        model: Users,
        as: 'reviewer',
      },
    ],
  };

  return Reviews.findAll(options)
    .then(feedbacks => feedbacks.map(feedback => feedback.get({ plain: true })))
    .then(feedbacks => res.json({ data: feedbacks }))
    .catch(error => next({ message: error.message }));
});

module.exports = router;
