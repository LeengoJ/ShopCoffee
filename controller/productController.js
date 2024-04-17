const ProductService = require("../service/product.service"); //Import dịch vụ liên quan đến Product
const handleResult = require("../helper/handleResult"); //helper chứa hàm showResult

exports.GetAllProduct = async (req, res) => {
  const result = await ProductService.GetAllProduct();
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.CreateProduct = async (req, res) => {
  const result = await ProductService.CreateProduct(req.body);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.GetProductById = async (req, res) => {
  const result = await ProductService.GetProductById(req.param.id);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.UpdateProduct = async (req, res) => {
  const result = await ProductService.updatedProduct(req.param.id, req.body);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.DeleteProduct = async (req, res) => {
  const result = await ProductService.deletedProduct(req.param.id);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
