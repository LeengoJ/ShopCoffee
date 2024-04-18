const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const productController = require("../controller/productController");
const multer = require("../middleware/upload");

router.post("", protect.authorize("admin"),multer.upload.single("img"), productController.CreateProduct);
router.post(
  "/:id",
  protect.authorize("admin"),
  multer.upload.single("img"),
  productController.UpdateProduct,
);
router.delete(
  "/:id",
  protect.authorize("admin"),
  productController.DeleteProduct,
);
router.get(
  "/:id",
  protect.authorize("admin"),
  productController.GetProductById,
);
router.get(
  "/",
  productController.GetAllProduct
);

// no middleware applied for these routes
// router.get("", productController.GetAllProduct, protect.authorize("admin"));

module.exports = router;
