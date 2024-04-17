var handleresult = require("../configs/handleResult");
var config = require("../configs/configs");
var jwt = require("jsonwebtoken");
var userService = require("../service/user.service");
var models_rollUser = require("../models/RoleUser");
var models_roll = require("../models/Role");
var models_userInEvent = require("../models/UserInEvent");

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
        req.headers.authorization.startsWith("bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies.token) {
        token = req.cookies.token;
      }
      if (!token) {
        return handleresult.showResult(res, 200, false, "vui long dang nhap");
      }
      const decode = jwt.verify(token, config.JWT_SECRET);

      let role = decode.Role;
      if (!roles.includes(role)) {
        return handleresult.showResult(res, 200, false, "ban khong co quyen");
      }
      next();
    };
  },
};
