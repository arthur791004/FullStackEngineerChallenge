require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { buildPath, host, port, sessionSecret } = require('./constants');
const addDevServer = require('./middlewares/addDevServer');
const errorHanlder = require('./middlewares/errorHanlder');
const api = require('./api');

const app = express();

if (process.env.NODE_ENV === 'development') {
  addDevServer(app);
}

app.use(bodyParser.json());

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      sameSite: 'Lax', // Only allow GET request with cookie from other site
      secure: false, // Disable secure because only use http in this challenge
    },
  })
);

app.use('/api', api);

app.use(express.static(buildPath));

app.get('*', (_, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

/**
 * Error handling
 */
app.use(errorHanlder);

const server = app.listen(port, host, error => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
    return;
  }

  if (process.env.NODE_ENV !== 'test') {
    console.log(`Server started at http://${host}:${port}`); // eslint-disable-line no-console
    console.log('Press Ctrl+C to quit.'); // eslint-disable-line no-console
  }
});

module.exports = server;
