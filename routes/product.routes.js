const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const productController = require("../controller/productController");

router.use(protect.authorize("admin"));
router.post("", productController.CreateProduct);
router.post("/:id", productController.UpdateProduct);
router.delete("/:id", productController.DeleteProduct);
router.get("/:id", productController.GetProductById);

// no middleware applied for these routes
router.get("", productController.GetAllProduct);

module.exports = router;
