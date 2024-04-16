const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/login", authController.loginController());
router.post("/register", authController.registerController());
router.post("/refresh", authController.resetPasswordController());
router.post("/forgotPassword", authController.forgotPasswordController());

// router.post("/logout", authController.());

// router.get("/user-profile", authController.());
// router.get("/searchUsers", authController.());

module.exports = router;
