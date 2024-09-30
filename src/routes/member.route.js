const MemberController = require("../controllers/member.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const UploadMiddleware = require("../middlewares/upload.middleware");
const Validator = require("../middlewares/validator.middleware");
const JoiUtil = require("../utils/joi.util");

const router = require("express").Router();

router.get("/", AuthMiddleware.authenticationAdmin, MemberController.getAllMember);
router.get("/:id", AuthMiddleware.authenticationAdmin, MemberController.getDetailMember);
router.put("/:id", AuthMiddleware.authenticationAdmin, UploadMiddleware.initializeUpload().single('photo'), Validator.validate(JoiUtil.editMember), MemberController.updateMember);
router.post("/", AuthMiddleware.authenticationAdmin, UploadMiddleware.initializeUpload().single('photo'), Validator.validate(JoiUtil.addMember), MemberController.addMember);
router.delete("/:id", AuthMiddleware.authenticationAdmin, MemberController.deleteMember);

module.exports = router