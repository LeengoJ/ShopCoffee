const DiscountService = require("../service/discount.service"); //Import dịch vụ liên quan đến Discount
const handleResult = require("../helper/handleResult"); //helper chứa hàm showResult

const { listenerCount } = require("../schema/user.schema");
const mongoose = require('mongoose');



const excelToJson = require("convert-excel-to-json");
const apiResponse = require("../helper/api-response");
const uploadFile = require("../middleware/upload");


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
exports.importExcelData2MongoDB = async (req, res, next) => {
  // -> Read Excel File to Json Data
  try {
    await uploadFile(req, res);
    if (req.files == undefined) {
      return apiResponse.validationErrorWithData(
        res,
        "Upload a file please!",
        {}
      );
    }
    const excelData = excelToJson({
      sourceFile: __basedir + "/public/upload/" + req.files[0].filename,
      sheets: [
        {
          // Excel Sheet Name
          name: "Sheet1",

          // Header Row -> be skipped and will not be present at our result object.
          header: {
            rows: 1,
          },

          // Mapping columns to keys
          columnToKey: {
            A: "startTime",
            B: "endTime",
            C: "name",
            D: "code",
            E: "discountPercent",
            F: "productIds",
          },
        },
      ],
    });
    console.log(excelData);
    // convert "startTime" to miliseconds
    excelData["Sheet1"] = excelData["Sheet1"].map((item) => {
      // split dd/mm/yy into [dd, mm, yy]
      const dateParts = item.startTime.split("/");

      // Note: month is 0-based, so minus 1
      const dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

      // convert date to miliseconds
      item.startTime = dateObject.getTime();

      return item;
    });
    excelData["Sheet1"] = excelData["Sheet1"].map((item) => {
      // split dd/mm/yy into [dd, mm, yy]
      const dateParts = item.endTime.split("/");

      // Note: month is 0-based, so minus 1
      const dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

      // convert date to miliseconds
      item.endTime = dateObject.getTime();

      return item;
    });

    await DiscountService.insertMany(excelData.Sheet1);
  } catch (err) {
    console.error("Error saving file:", err);
    return apiResponse.ErrorResponse(res, err);
  }
};
