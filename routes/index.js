const router = require('express').Router();
const userRoute = require('./api/users-routes');
const thoughtRoute = require('./api/thought-routes');

router.use('/api/users', userRoute);
router.use('/api/thoughts', thoughtRoute);

module.exports = router;