const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const discountController = require("../controller/discountController");

router.get(
  "/getAllDiscountsOfProduct/:productId",
  discountController.GetDiscountOfProductById
);
router.get("/getDiscountByCode", discountController.GetDiscountByCode);

router.get("/getAll", protect.authorize("admin"), discountController.GetAllDiscount);
router.post("/updateDiscount/:id", protect.authorize("admin"),discountController.UpdateDiscount);
router.delete("/:id", protect.authorize("admin"),discountController.DeleteDiscount);

router.get("/:id", protect.authorize("admin"),discountController.GetDiscountById);
router.post("/", protect.authorize("admin"),discountController.CreateDiscount);

router.post(
  "/importExcelData2MongoDB",protect.authorize("admin"),
  discountController.importExcelData2MongoDB
);

module.exports = router;
