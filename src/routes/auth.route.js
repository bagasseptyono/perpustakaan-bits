const AuthController = require('../controllers/auth.controller');
const Validator = require('../middlewares/validator.middleware');
const JoiUtil = require('../utils/joi.util');

const router = require('express').Router()

router.post('/register', Validator.validate(JoiUtil.registerUser), AuthController.registerUser);
router.post('/login', Validator.validate(JoiUtil.loginUser), AuthController.loginUser);

module.exports = router