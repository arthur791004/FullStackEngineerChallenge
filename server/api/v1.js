const { Router } = require('express');
const healthy = require('./healthy');
const users = require('./users');

const router = Router();

router.use('/healthy', healthy);
router.use('/users', users);

module.exports = router;
