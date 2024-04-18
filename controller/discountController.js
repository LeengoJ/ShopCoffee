const DiscountService = require("../service/discount.service"); //Import dịch vụ liên quan đến Discount
const handleResult = require("../helper/handleResult"); //helper chứa hàm showResult
const { listenerCount } = require("../schema/user.schema");
const mongoose = require('mongoose');



exports.GetAllDiscount = async (req, res) => {
  let result = await DiscountService.GetAllDiscount();
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    result = result.map(p=>{
      p = p.toObject();
      p.id = p._id.toString();
      p.productIds = p.productIds.map(p=>p.name).join(', ');
      return p;
    });
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.CreateDiscount = async (req, res) => {
  let productIds = req.body.productIds.split(";").map(id=>id.trim().replace("\n",""));
  let checkIdValid = true;
  for (let i=0; i<productIds.length; i++) {
    if(!mongoose.Types.ObjectId.isValid(productIds[i])){
      checkIdValid = false;
      break;
    }
  }
  if(!checkIdValid) {
    handleResult.showResult(res, 400, false, "Id không hợp lệ", null);
    return;
  }
  req.body.productIds = productIds;

  const result = await DiscountService.CreateDiscount(req.body);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", {id:result._id.toString()});
  }
};
exports.GetDiscountById = async (req, res) => {
  let result = await DiscountService.GetDiscountById(req.params.id);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    result = result.toObject();
    result.id = result._id.toString();
    result.productIds = result.productIds.join(';');
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.GetDiscountByCode = async (req, res) => {
  let result = await DiscountService.getDiscountByCode(req.query.code);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    result = result.toObject();
    result.id = result._id.toString();
    result.productIds = result.productIds.join(';');
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
  let productIds = req.body.productIds.split(";").map(id=>id.trim().replace("\n",""));
  let checkIdValid = true;
  for (let i=0; i<productIds.length; i++) {
    if(!mongoose.Types.ObjectId.isValid(productIds[i])){
      checkIdValid = false;
      break;
    }
  }
  if(!checkIdValid) {
    handleResult.showResult(res, 400, false, "Id không hợp lệ", null);
    return;
  }
  req.body.productIds = productIds;
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
