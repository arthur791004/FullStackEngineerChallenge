import api from '.';

export const login = (email, password) =>
  api.post('/users/login', { email, password });

export const logout = () => api.post('/users/logout');

export const getUserList = () => api.get('/users');

export const createUser = user => api.post('/users', user);
