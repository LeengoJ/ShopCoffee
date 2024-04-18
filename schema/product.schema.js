const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Timestamp } = require("mongodb");

const ProductSchema = new Schema(
  {
    // productId: { type: Number, unique: true },
    name: String,
    img: { type: String, default: null },
    sizes: String,
    description: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
