const mongoose = require("mongoose");
const { Schema } = mongoose;

const DiscountSchema = new Schema(
  {
    startTime: Number,
    endTime: Number,
    name: String,
    code: { type: String, unique: true },
    discountPercent: Number,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

const Discount = mongoose.model("Discount", DiscountSchema);

module.exports = Discount;
