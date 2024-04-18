var User = require("../schema/user.schema");
var sendmail = require("../middleware/sendMail");
const configs = require("../config/configs");
const crypto = require("crypto");

module.exports = {
  Register: async (item) => {
    const check = await User.find({ email: item.email });
    if (check.length > 0) {
      return { error: "Trùng gmail hoặc username" };
    } else {
      let newItem = await new User(item).save();
      return await newItem.getSignedJWT();
    }
  },
  Login: async (item) => {
    const { email, passWord } = item;
    // console.log(userName + passWord);
    const result = await User.findByCredentinal(email, passWord);

    if (result.error) {
      return result;
    }
    // console.log(result);
    return result.getSignedJWT();
  },
  ResetPassWord: async (item) => {
    const resetPassToken = crypto
      .createHash("sha256")
      .update(item.resetToken)
      .digest("hex");
    const user = await User.findOne({
      resetPassToken: resetPassToken,
      resetPassTokenExp: { $gt: Date.now() },
    });
    if (!user) return false;
    user.password = item.password;
    user.resetPassToken = undefined;
    user.resetPassTokenExp = undefined;
    await user.save();
    return true;
  },
  FogotPassWord: async (item) => {
    const user = await User.findOne({ email: item.email }).exec();

    if (!user) return false;

    const tokenReset = user.resetPassword();
    await user.save();

    const resetURL = `${configs.HOST}api/v1/auth/resetpassword/${tokenReset}`;
    const message = `Truy cap vao link de doi passs: ${resetURL}`;

    try {
      await sendmail.SendMail({
        email: user.email,
        subject: " Doi Pass",
        message: message,
      });
      return "check mail";
    } catch (error) {
      user.resetPassToken = undefined;
      user.resetPassTokenExp = undefined;
      await user.save();
      return "khong gui duoc mail" + error;
    }
  },
};
