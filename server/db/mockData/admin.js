const { ROLES } = require('../../constants/users');
const generateUser = require('../utils/generateUser');

const admin = generateUser('admin', ROLES.ADMIN);

module.exports = admin;
