var Discount = require("../schema/discount.schema");

module.exports = {
  CreateDiscount: async (item) => {
    const discount = new Discount(item);
    return await discount.save();
  },
  GetAllDiscount: async () => {
    let allDiscount = await Discount.find().exec();
    if (allDiscount.length > 0) {
      return allDiscount;
    } else {
      return "Khong co Discount nao";
    }
  },
  GetDiscountById: async (item) => {
    let discount = await Discount.findById(item).exec();
    if (discount) {
      return discount;
    } else {
      return "Khong co Discount nao";
    }
  },
  updatedDiscount: async (id, newDiscount) => {
    const updatedDiscount = await Discount.findByIdAndUpdate(id, newDiscount, {
      new: true,
    }); // {new: true} để trả về object sau khi cập nhật
    if (updatedDiscount.length > 0) {
      return updatedDiscount;
    } else {
      return "Khong co Discount voi id nay";
    }
  },
  deletedDiscount: async (id) => {
    const deletedDiscount = await Discount.findByIdAndDelete(id);
    if (updatedDiscount) {
      return "Da xoa thanh cong" + deletedDiscount;
    } else {
      return "Khong co Discount voi id nay";
    }
  },
  getAllDiscountsOfProduct: async (id) => {
    const discount = await Discount.find({ productId: id });
    if (discount.length > 0) {
      return discount;
    } else {
      return "Khong co Discount cho san pham nay";
    }
  },
  getDiscountByCode: async (code) => {
    const updateStatus = await Discount.findOne({ code: code });
    if (updateStatus.length > 0) {
      return updateStatus;
    } else {
      return "Khong co Discount nay";
    }
  },
  insertMany: async (data) => {
    const discount = Discount.insertMany(data);
    if (discount.length > 0) {
      return discount;
    } else {
      return "loi tao";
    }
  },
};
