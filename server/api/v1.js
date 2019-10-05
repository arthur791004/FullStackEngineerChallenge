const { Router } = require('express');
const permission = require('../middlewares/permission');

const healthy = require('./healthy');
const me = require('./me');
const reviews = require('./reviews');
const users = require('./users');

const router = Router();

router.use('/healthy', healthy);

router.use('/me', permission(), me);
router.use('/reviews', reviews);
router.use('/users', users);

module.exports = router;
