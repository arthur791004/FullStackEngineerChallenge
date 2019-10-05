import api from '.';

export const login = (email, password) =>
  api.post('/users/login', { email, password });
