const mongoose = require("mongoose");
const { Schema } = mongoose;

const TableSchema = new Schema(
  {
    name: String,
    floor: { type: Number },
    status: String,
    tableNumber: { type: Number },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", TableSchema);

module.exports = Table;
