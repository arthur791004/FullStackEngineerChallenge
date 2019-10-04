const { Router } = require('express');

const router = Router();

router.get('/', (_, res) => {
  res.json({
    message: 'The server is healthy',
  });
});

module.exports = router;
