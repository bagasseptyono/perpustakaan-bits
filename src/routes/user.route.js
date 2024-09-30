const UserController = require("../controllers/user.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const Validator = require("../middlewares/validator.middleware");
const JoiUtil = require("../utils/joi.util");

const router = require("express").Router();

router.get("/", AuthMiddleware.authentication, UserController.getDetailUser)
router.put("/", AuthMiddleware.authentication, Validator.validate(JoiUtil.editUser), UserController.updateUser)

module.exports = router;