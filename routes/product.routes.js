const express = require("express");
const router = express.Router();
const checkRoleAdmin = require("../middleware/checkrole");
const {
  create,
  update,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/productController");

router.use(checkRoleAdmin);
router.post("", create);
router.post("/:id", update);
router.delete("/:id", deleteProduct);
router.get("/:id", getProduct);

// no middleware applied for these routes
router.get("", getAllProducts);

module.exports = router;
