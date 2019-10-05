module.exports = async () => {
  const server = require('../../server');
  const db = require('../../server/db/models');

  // Close db connections
  await db.sequelize.close();

  // Shutdown server
  server.close();
};
