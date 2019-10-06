import api from '.';

export const getReviewList = () => api.get('/reviews');

export const sendReview = (reviewId, review) =>
  api.post(`/reviews/${reviewId}/feedback`, review);
