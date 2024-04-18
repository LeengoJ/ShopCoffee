const express = require("express");
const router = express.Router();
// const checkRoleAdmin = require("../middleware/checkrole");
const protect = require("../middleware/protect");
const userController = require("../controller/userController");
// , protect.authorize("admin"),
//   protect.authorize("admin"),
//   protect.authorize("admin")
// router.use(checkRoleAdmin);
router.get("", userController.GetAllUser);
router.post("/changeRole/:id", userController.updateRole);
router.post("/changeBan/:id", userController.changeBan);

module.exports = router;
