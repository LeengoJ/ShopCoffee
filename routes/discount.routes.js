const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const discountController = require("../controller/discountController");

router.use(protect.authorize("admin"));
router.post("", discountController.CreateDiscount);
router.get("/:id", discountController.GetDiscountById);
router.get(
  "/getAllDiscountsOfProduct/:productId",
  discountController.GetDiscountOfProductById
);
router.get("", discountController.GetAllDiscount);
router.post("/updateDiscount/:discountId", discountController.UpdateDiscount);
router.delete("/:id", discountController.DeleteDiscount);
router.get("/getDiscountByCode", discountController.GetDiscountByCode);

module.exports = router;
