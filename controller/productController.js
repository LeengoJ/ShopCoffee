const ProductService = require("../service/product.service"); //Import dịch vụ liên quan đến Product
const handleResult = require("../helper/handleResult"); //helper chứa hàm showResult
const uploadFile = require("../middleware/upload");
const Product = require("../schema/product.schema");

exports.GetAllProduct = async (req, res) => {
  let result = await ProductService.GetAllProduct();
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    // console.log(result);
    result = result.map(p=>{
      p = p.toObject();
      p.productId = p._id.toString();
      return p;
    });
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.CreateProduct = async (req, res) => {
  let imagePath = null;
  if(req.file){
    imagePath = req.file.path;
    req.body.img = req.file.path.split('\\')[req.file.path.split('\\').length-1];
  }
  let result = await ProductService.CreateProduct(req.body);
  // res.send(result);
  if (result.error) {
    try{
      if(imagePath!=null)
        await uploadFile.unlinkAsync(imagePath);
    }catch(err){
      console.log(err);
    }
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    result = result.toObject();
    result.productId = result._id.toString();
    handleResult.showResult(res, 200, true, "Success",result );
  }
};
exports.GetProductById = async (req, res) => {
  // console.log(req.params.id);
  let result = await ProductService.GetProductById(req.params.id);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    result = result.toObject();
    result.productId = result._id.toString();
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.UpdateProduct = async (req, res) => {
  let imagePath = null;
  if(req.file){
    imagePath = req.file.path;
    req.body.img = req.file.path.split('\\')[req.file.path.split('\\').length-1];
  }
  const result = await ProductService.updatedProduct(req.params.id, req.body);
  // res.send(result);
  if (result.error) {
    try{
      if(imagePath!=null)
        await uploadFile.unlinkAsync(imagePath);
    }catch(err){
      console.log(err);
    }
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.DeleteProduct = async (req, res) => {
  const result = await ProductService.deletedProduct(req.params.id);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
