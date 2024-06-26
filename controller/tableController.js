const TableService = require("../service/table.service"); //Import dịch vụ liên quan đến Table
const handleResult = require("../helper/handleResult"); //helper chứa hàm showResult

exports.GetAllTable = async (req, res) => {
  let result = await TableService.GetAllTable();
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    result = result.map(t=>{
      t = t.toObject();
      t.id = t._id.toString();
      return t;
    })
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.CreateTable = async (req, res) => {
  const result = await TableService.CreateTable(req.body);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", {id:result._id.toString()});
  }
};
exports.GetTableById = async (req, res) => {
  let result = await TableService.GetTableById(req.params.id);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    result = result.toObject();
    result.id = result._id.toString();
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.UpdateTable = async (req, res) => {
  const result = await TableService.updatedTable(req.params.id, req.body);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.DeleteTable = async (req, res) => {
  const result = await TableService.deletedTable(req.params.id);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.searchByName = async (req, res) => {
  const result = await TableService.searchByName(req.body.name);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.updateStatusTable = async (req, res) => {
  const result = await TableService.updateStatusTable(
    req.params.id,
    req.body.status
  );
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
