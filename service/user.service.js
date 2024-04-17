const User = require("../schema/user.schema");
var User = require("../schema/user.schema");

module.exports = {
  GetById: async (item) => {
    let User = await User.findById(item);
    if (allUser.length > 0) {
      return User;
    } else {
      return "Khong co user voi id nay";
    }
  },
  GetAllUser: async () => {
    let allUser = await User.find().exec();
    if (allUser.length > 0) {
      return allUser;
    } else {
      return "Khong co user nao";
    }
  },
  updateRole: async (id, newRole) => {
    let updatedUser = await User.findByIdAndUpdate(
      id,
      { role: newRole },
      { new: true }
    ).exec();
    if (updatedUser) {
      return updatedUser;
    } else {
      return "Không thể cập nhật vai trò, kiểm tra lại Id người dùng.";
    }
  },
  changeBan: async (id, isBan) => {
    let updatedUser = await User.findByIdAndUpdate(
      id,
      { isBan: isBan },
      { new: true }
    ).exec();
    if (updatedUser) {
      return updatedUser;
    } else {
      return "Không thể ban, kiểm tra lại Id người dùng.";
    }
  },
};
