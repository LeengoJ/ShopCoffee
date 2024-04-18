const DiscountService = require("../service/discount.service"); //Import dịch vụ liên quan đến Discount
const handleResult = require("../helper/handleResult"); //helper chứa hàm showResult

exports.GetAllDiscount = async (req, res) => {
  const result = await DiscountService.GetAllDiscount();
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.CreateDiscount = async (req, res) => {
  const result = await DiscountService.CreateDiscount(req.body);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.GetDiscountById = async (req, res) => {
  const result = await DiscountService.GetDiscountById(req.params.id);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.GetDiscountByCode = async (req, res) => {
  const result = await DiscountService.getDiscountByCode(req.body.code);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.GetDiscountOfProductById = async (req, res) => {
  const result = await DiscountService.getAllDiscountsOfProduct(
    req.params.productId
  );
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.UpdateDiscount = async (req, res) => {
  const result = await DiscountService.updatedDiscount(req.params.id, req.body);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.DeleteDiscount = async (req, res) => {
  const result = await DiscountService.deletedDiscount(req.params.id);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
