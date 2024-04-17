const express = require("express");
const router = express.Router();
// const checkRoleAdmin = require("../middleware/checkrole");
const userController = require("../controller/userController");

// router.use(checkRoleAdmin);
router.get("", userController.GetAllUser);
router.post("/changeRole/:id", userController.updateRole);
router.post("/changeBan/:id", userController.changeBan);

module.exports = router;
