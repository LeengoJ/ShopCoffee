var handleresult = require("../helper/handleResult");
var config = require("../config/configs");
var jwt = require("jsonwebtoken");
var userService = require("../service/user.service");

module.exports = {
  protect: async (req, res, next) => {
    let token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return handleresult.showResult(res, 200, false, "vui long dang nhap");
    }

    try {
      const decode = jwt.verify(token, config.JWT_SECRET);
      // console.log(decode);
      req.user = await userService.getItemById(decode.id);
      next();
    } catch (error) {
      return handleresult.showResult(res, 200, false, "vui long dang nhap");
    }
  },
  authorize: (...roles) => {
    return async (req, res, next) => {
      //
      let token = "";
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies.token) {
        token = req.cookies.token;
      }
      if (!token) {
        return handleresult.showResult(res, 200, false, "vui long dang nhap");
      }
      const decode = jwt.verify(token, config.JWT_SECRET);
      let user = await userService.GetById(decode.id);
      let role = user.role;
      if (!roles.includes(role)) {
        return handleresult.showResult(res, 200, false, "ban khong co quyen");
      }
      next();
    };
  },
};
