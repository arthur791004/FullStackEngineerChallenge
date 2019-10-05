/**
 * Utils for generate fake review
 */
const generateReview = (reviewer, reviewee) => ({
  reviewerId: reviewer.id,
  revieweeId: reviewee.id,
  rating: Math.ceil(Math.random() * 5),
  content: `fake feedbacks from ${reviewer.email} to ${reviewee.email}`,
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

module.exports = generateReview;
