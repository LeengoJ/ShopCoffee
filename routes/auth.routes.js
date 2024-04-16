const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  refresh,
  userProfile,
  searchUsers,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/user-profile", userProfile);
router.get("/searchUsers", searchUsers);

module.exports = router;
