const express = require("express");
const router = express.Router();

const usersRoutes = require("./users.routes");
const authRoutes = require("./auth.routes");
const productsRoutes = require("./products.routes");
const tablesRoutes = require("./tables.routes");
const discountsRoutes = require("./discounts.routes");
const ordersRoutes = require("./orders.routes");
const beforeOrdersRoutes = require("./before_orders.routes");

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/products", productsRoutes);
router.use("/tables", tablesRoutes);
router.use("/discounts", discountsRoutes);
router.use("/orders", ordersRoutes);
router.use("/before_orders", beforeOrdersRoutes);

module.exports = router;
