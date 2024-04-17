const authService = require("../service/auth.service"); //Import dịch vụ liên quan đến user
const handleResult = require("../helper/handleResult"); //helper chứa hàm showResult

exports.registerController = async (req, res) => {
  // console.log(req.body);
  const result = await authService.Register(req.body);

  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Đăng ký thành công", result);
  }
};

exports.loginController = async (req, res) => {
  const result = await authService.Login(req.body);
  if (result.error) {
    handleResult.showResult(res, 400, false, result.error, null);
  } else {
    handleResult.showResult(res, 200, true, "Đăng nhập thành công", result);
  }
};

exports.resetPasswordController = async (req, res) => {
  const result = await authService.ResetPassWord(req.body);
  if (!result) {
    handleResult.showResult(
      res,
      400,
      false,
      "Không thể đặt lại mật khẩu",
      null
    );
  } else {
    handleResult.showResult(
      res,
      200,
      true,
      "Đặt lại mật khẩu thành công",
      null
    );
  }
};

exports.forgotPasswordController = async (req, res) => {
  const result = await authService.FogotPassWord(req.body);
  if (result !== "check mail") {
    handleResult.showResult(res, 400, false, result, null);
  } else {
    handleResult.showResult(
      res,
      200,
      true,
      "Kiểm tra email để đặt lại mật khẩu",
      null
    );
  }
};
