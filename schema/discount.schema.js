const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Timestamp } = require("mongodb");

const DiscountSchema = new Schema(
  {
    startTime: Number,
    endTime: Number,
    name: String,
    code: { type: String, unique: true },
    discountPercent: Number,
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const Discount = mongoose.model("Discount", DiscountSchema);

module.exports = Discount;
