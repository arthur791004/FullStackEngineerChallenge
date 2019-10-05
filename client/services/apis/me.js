import api from '.';

export const getAuthInfo = () => api.get('/me');
