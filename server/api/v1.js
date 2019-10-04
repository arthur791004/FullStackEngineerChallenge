const { Router } = require('express');
const healthy = require('./healthy');
const reviews = require('./reviews');
const users = require('./users');

const router = Router();

router.use('/healthy', healthy);
router.use('/reviews', reviews);
router.use('/users', users);

module.exports = router;
