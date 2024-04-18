const express = require("express");
const router = express.Router();

const usersRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const productsRoutes = require("./product.routes");
const tablesRoutes = require("./table.routes");
const discountsRoutes = require("./discount.routes");
const filesRoutes = require("./file.routes");

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/products", productsRoutes);
router.use("/tables", tablesRoutes);
router.use("/discounts", discountsRoutes);
router.use("/files", filesRoutes);

module.exports = router;
