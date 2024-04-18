const express = require("express");
const router = express.Router();

var controller = require("../controller/file.controller");
// var Auth = require('../core/Auth');
/* GET users listing. */
router.get("/", controller.getListFiles);
router.get("/:name", controller.download);

module.exports = router;
router.post("/upload", controller.upload);
