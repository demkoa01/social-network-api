const router = require('express').Router();
const userRoute = require('./api/users-routes');
const thoughtRoute = require('./api/thought-routes');

router.use('/users', userRoute);
router.use('/thoughts', thoughtRoute);

module.exports = router;