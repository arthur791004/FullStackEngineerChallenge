import api from '.';

export const getAuthInfo = () => api.get('/me');

export const getRequiringReviews = () => api.get('/me/requiringReviews');

export const getFeedbacks = () => api.get('/me/feedbacks');
