const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    email_verified_at: { type: Date, default: null },
    password: String,
    role: String,
    sdt: String,
    rememberToken: String,
    isBan: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
