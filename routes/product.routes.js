const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const productController = require("../controller/productController");
const multer = require("../middleware/upload");

router.post("", protect.authorize("admin"),multer.upload.single("img"), productController.CreateProduct);
router.post(
  "/:id",
  multer.upload.single("img"),
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
