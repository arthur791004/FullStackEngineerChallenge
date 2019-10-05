const initMockData = async () => {
  const db = require('../../../db/models');
  const { admin, users, reviews } = require('../../../db/mockData');

  /**
   * Clean data and sync schema
   */
  await db.sequelize.drop();
  await db.sequelize.sync({ force: true });

  /**
   * Create data for test
   */
  await db.Users.create(admin);
  await db.Users.bulkCreate(users);
  await db.Reviews.bulkCreate(reviews);
};

const login = async ({ email, password }) => {
  const api = global.createApi('/api/v1/users');
  const res = await api.post('/login', { email, password });

  return res;
};

const getCookieByUser = async user => {
  const { headers } = await login(user);

  return headers['set-cookie'].join(';');
};

module.exports = {
  initMockData,
  login,
  getCookieByUser,
};
