const util = require("util");
const fs = require("fs");
const multer = require("multer");

class FileManager {

  constructor(){
    return this;
  }

  storage(destination) {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, process.cwd() + destination);
      },
      filename: (req, file, cb) => {
        const nameTokens = file.originalname.split(".");
        const extension = nameTokens[nameTokens.length - 1];
        const uniqueFileId =
          Date.now() + "_" + Math.round(Math.random() * 1e9) + `.${extension}`;
        cb(null, uniqueFileId);
      },
    });
  }

  saveFile(destination, maxFileSize) {
    return multer({
      storage: this.storage(destination),
      limits: { fileSize: maxFileSize },
    }).single("file");
  }

  async remove(filePath){
    const unlinkAsync = util.promisify(fs.unlink)
    await unlinkAsync(process.cwd() + filePath)
  }
}

module.exports = FileManager;
