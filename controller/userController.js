const userService = require("../service/user.service"); //Import dịch vụ liên quan đến user
const handleResult = require("../helper/handleResult"); //helper chứa hàm showResult

exports.GetAllUser = async (req, res) => {
  const result = await userService.GetAllUser();
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.updateRole = async (req, res) => {
  const result = await userService.updateRole(req.param.id, req.body.newRole);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.changeBan = async (req, res) => {
  const result = await userService.changeBan(req.param.id, req.body.isBan);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
