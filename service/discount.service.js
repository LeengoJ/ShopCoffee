var Discount = require("../schema/discount.schema");

module.exports = {
  CreateDiscount: async (item) => {
    const discount = new Discount(item);
    return await discount.save();
  },
  GetAllDiscount: async () => {
    let allDiscount = await Discount.find({}).populate("productIds");
    return allDiscount;
    // if (allDiscount.length > 0) {
    //   return allDiscount;
    // } else {
    //   return "Khong co Discount nao";
    // }
  },
  GetAllDiscountValidNow: async () => {
    let now = Date.now();
    let allDiscount = await Discount.find({ $and:[{startTime: { $lte: now }},{endTime: { $gte: now }}]});
    return allDiscount;
  },
  GetDiscountById: async (item) => {
    let discount = await Discount.findById(item).exec();
    if (discount) {
      return discount;
    } else {
      return {error:"Khong co Discount nao"};
    }
  },
  updatedDiscount: async (id, newDiscount) => {
    console.log(id)
    const updatedDiscount = await Discount.findByIdAndUpdate(id, newDiscount, {
      new: true,
    }); // {new: true} để trả về object sau khi cập nhật
    return  updatedDiscount;
  },
  deletedDiscount: async (id) => {
    const deletedDiscount = await Discount.findByIdAndDelete(id);
    if (deletedDiscount) {
      return "Da xoa thanh cong" + deletedDiscount;
    } else {
      return {error:"Khong co Discount voi id nay"};
    }
  },
  getAllDiscountsOfProduct: async (id) => {
    const discount = await Discount.find({ productId: id });
    if (discount.length > 0) {
      return discount;
    } else {
      return {error:"Khong co Discount cho san pham nay"};
    }
  },
  getDiscountByCode: async (code) => {
    let updateStatus = await Discount.findOne({ code: code });
    if (updateStatus) {
      return updateStatus;
    } else {
      return {error:"Khong co Discount nay"};
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
