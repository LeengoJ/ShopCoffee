const util = require("util");
const multer = require("multer");
const fs = require("fs");

const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).any();

// create the exported middleware object
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
module.exports.upload = multer({ storage: storage });
module.exports.unlinkAsync = util.promisify(fs.unlink);
module.exports.unlinkAsyncByName = (fileName)=> util.promisify(fs.unlink)(__basedir + "/public/upload"+fileName);

