const { Router } = require('express');
const users = require('./users');

const router = Router();

router.get('/healthy', (_, res) => {
  res.json({
    message: 'The server is healthy',
  });
});

router.use('/users', users);

module.exports = router;
