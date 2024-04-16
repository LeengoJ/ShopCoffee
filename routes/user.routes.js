const express = require("express");
const router = express.Router();
const checkRoleAdmin = require("../middleware/checkrole");
const {
  getAllUsers,
  updateRole,
  changeBan,
} = require("../controllers/userController");

router.use(checkRoleAdmin);
router.get("", getAllUsers);
router.post("/changeRole/:id", updateRole);
router.post("/changeBan/:id", changeBan);

module.exports = router;
