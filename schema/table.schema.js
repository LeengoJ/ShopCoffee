const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Timestamp } = require("mongodb");

const TableSchema = new Schema(
  {
    name: String,
    floor: { type: Number },
    status: {
      type:String,
      default:"open"
    },
    tableNumber: { type: Number },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", TableSchema);

module.exports = Table;
