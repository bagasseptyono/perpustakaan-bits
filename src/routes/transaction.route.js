const TransactionController = require('../controllers/transaction.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const Validator = require('../middlewares/validator.middleware');
const JoiUtil = require('../utils/joi.util');

const router = require('express').Router();

router.post('/borrow', AuthMiddleware.authenticationAdmin, Validator.validate(JoiUtil.borrowBook), TransactionController.borrowBook)
router.post('/return', AuthMiddleware.authenticationAdmin, Validator.validate(JoiUtil.returnBook), TransactionController.returnBook)
router.get('/borrow', AuthMiddleware.authenticationAdmin, TransactionController.reportBorrowBook)
router.get('/return', AuthMiddleware.authenticationAdmin, TransactionController.reportReturnBook)

module.exports = router;