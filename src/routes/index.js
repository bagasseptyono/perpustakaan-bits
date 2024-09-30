const router = require('express').Router();

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const memberRoute = require('./member.route');


router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/members', memberRoute);



module.exports = router