const router = require('express').Router();

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const memberRoute = require('./member.route');
const bookRoute = require('./book.route');
const transactionRoute = require('./transaction.route');


router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/members', memberRoute);
router.use('/books', bookRoute);
router.use('/transactions', transactionRoute);



module.exports = router