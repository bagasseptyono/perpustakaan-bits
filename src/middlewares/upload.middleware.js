const multer = require("multer");
const path = require("path");
const fs = require("fs");

class UploadMiddleware {
    static initializeUpload() {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                if (file.fieldname === "photo") {
                    const dirPath = path.join(__dirname,"../../public/images/members");
                    if (!fs.existsSync(dirPath)) {
                        fs.mkdirSync(dirPath, { recursive: true });
                    }
                    cb(null, "./public/images/members");
                } else if (file.fieldname === "bookPhotos") {
                    const dirPath = path.join(__dirname,"../../public/images/books");
                    if (!fs.existsSync(dirPath)) {
                        fs.mkdirSync(dirPath, { recursive: true });
                    }
                    cb(null, "./public/images/books");
                } else {
                    cb(new Error("Unknown file field"), false);
                }
            },
            filename: function (req, file, cb) {
                const fileName = file.originalname
                    .toLowerCase()
                    .split(" ")
                    .join("-");
                cb(null, Date.now() + "-" + fileName);
            },
        });

        return multer({
            storage: storage,
            limits: { fileSize: 10 * 1024 * 1024 },
        });
    }
}

module.exports = UploadMiddleware;
