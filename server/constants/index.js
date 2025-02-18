const path = require('path');

const rootPath = process.cwd();
const buildPath = path.join(rootPath, 'build');

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET || 'paypay performance review';

module.exports = {
  buildPath,
  host,
  port,
  sessionSecret,
};
