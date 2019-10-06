import api from '.';

export const getReviewList = () => api.get('/reviews');

export const createReview = review => api.post('/reviews', review);

export const deleteReview = id => api.delete(`/reviews/${id}`);

/**
 * Send a feedback to a review
 */
export const sendReview = (reviewId, review) =>
  api.post(`/reviews/${reviewId}/feedback`, review);
