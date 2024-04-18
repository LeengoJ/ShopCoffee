const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const productController = require("../controller/productController");

router.post("", productController.CreateProduct, protect.authorize("admin"));
router.post(
  "/:id",
  productController.UpdateProduct,
  protect.authorize("admin")
);
router.delete(
  "/:id",
  productController.DeleteProduct,
  protect.authorize("admin")
);
router.get(
  "/:id",
  productController.GetProductById,
  protect.authorize("admin")
);

// no middleware applied for these routes
// router.get("", productController.GetAllProduct, protect.authorize("admin"));

module.exports = router;
