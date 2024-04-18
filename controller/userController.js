const userService = require("../service/user.service"); //Import dịch vụ liên quan đến user
const handleResult = require("../helper/handleResult"); //helper chứa hàm showResult

exports.GetAllUser = async (req, res) => {
  let result = await userService.GetAllUser();
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    result = result.map(p => {
      p = p.toObject();
      p.id = p._id.toString();
      return p;
    }).filter(u=>u.role!="admin");
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.updateRole = async (req, res) => {
  const result = await userService.updateRole(req.params.id, req.body.role);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
exports.changeBan = async (req, res) => {
  const result = await userService.changeBan(req.params.id, req.body.isBan);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Success", result);
  }
};
