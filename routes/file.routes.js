const express = require("express");
const router = express.Router();

var controller = require("../controller/file.controller");
const multer = require("../middleware/upload");
// var Auth = require('../core/Auth');
/* GET users listing. */
router.get("/", controller.getListFiles);
router.get("/:name", controller.download);

router.post("/upload",multer.upload.single("img"), controller.upload);
module.exports = router;
