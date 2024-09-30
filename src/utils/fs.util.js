const fs = require('fs')

class FsUtil {
    static deleteFileExists(fileName,path) {
        const folderPath = `public/images/${path}/${fileName}`
        if (fs.existsSync(folderPath)) {
            fs.unlinkSync(folderPath)
        }
    }
}

module.exports = FsUtil