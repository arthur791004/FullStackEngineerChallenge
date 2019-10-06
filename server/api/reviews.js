const { Router } = require('express');
const { ERROR_MESSAGES } = require('../constants/errors');
const { Reviews } = require('../db/models');
const permission = require('../middlewares/permission');
const adminPermission = require('../middlewares/permission/admin');

const router = Router();

/**
 * Get all reviews (admin only)
 */
router.get('/', adminPermission, (req, res, next) => {
  return Reviews.findAll()
    .then(reviews => reviews.map(review => review.get()))
    .then(reviews => res.json({ data: reviews }))
    .catch(error => next({ message: error.message }));
});

/**
 * Create a new review (admin only)
 * @param {string} revieweeId - user to be reviewed
 * @param {string} reviewerId - user requested to send a feedback
 */
router.post('/', adminPermission, (req, res, next) => {
  const { revieweeId, reviewerId } = req.body;

  return Reviews.create({ revieweeId, reviewerId })
    .then(review => res.json({ data: review.get() }))
    .catch(error => next({ message: error.message }));
});

/**
 * Upsert the feedback of target review
 * @description only reviewer could upsert the feedback of review
 * @param {integer} rate
 * @param {string} content
 */
router.post('/:reviewId/feedback', permission(), (req, res, next) => {
  const { reviewId } = req.params;
  const { rating, content } = req.body;
  const { id: userId } = req.session.user;

  return Reviews.findByPk(reviewId)
    .then(review => {
      // check current user is reviewer or not
      if (review.reviewerId !== userId) {
        throw new Error(ERROR_MESSAGES.PERMISSION_DENIED);
      }

      return review;
    })
    .then(review => review.update({ rating, content }))
    .then(review =>
      review.getReviewee().then(reviewee => ({
        ...review.get(),
        reviewee: reviewee.get(),
      }))
    )
    .then(review => res.json({ data: review }))
    .catch(error => next({ message: error.message }));
});

/**
 * Delete a review with related feedbacks by reviewId (admin only)
 * @param {string} reviewId
 */
router.delete('/:reviewId', adminPermission, (req, res, next) => {
  const { reviewId } = req.params;

  return Reviews.findByPk(reviewId)
    .then(review => review.destroy())
    .then(review => res.json({ data: review.get() }))
    .catch(error => next({ message: error.message }));
});

module.exports = router;
