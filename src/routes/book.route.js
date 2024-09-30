const BookController = require("../controllers/book.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const UploadMiddleware = require("../middlewares/upload.middleware");
const Validator = require("../middlewares/validator.middleware");
const JoiUtil = require("../utils/joi.util");

const router = require("express").Router();

router.post('/', AuthMiddleware.authenticationAdmin, Validator.validate(JoiUtil.addBook), BookController.createBook);
router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getDetailBook);
router.put('/:id', AuthMiddleware.authenticationAdmin, Validator.validate(JoiUtil.updateBook), BookController.updateBook);
router.delete('/:id', AuthMiddleware.authenticationAdmin , BookController.deleteBook); 
router.post('/assets/:id', AuthMiddleware.authenticationAdmin,UploadMiddleware.initializeUpload().array('bookPhotos') , BookController.addBookAssets);
router.delete('/assets/:id', AuthMiddleware.authenticationAdmin , BookController.deleteBookAssets);

module.exports = router