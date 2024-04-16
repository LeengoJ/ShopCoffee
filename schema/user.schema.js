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

// Ma hoa password
UserSchema.pre("save", function (next) {
  if (!this.isModified("passWord")) {
    next();
  } else {
    let salt = bcrypt.genSaltSync(configs.saltRounds); // tao 1 chuoi ngau nhien duoc 1 cach dong bo
    this.passWord = bcrypt.hashSync(this.passWord, salt); //;luu chuoi vua duoc tao ra bang ham hashSync vao db
  }
  next();
});
//Chua hieu lam, co le la set thoi gian requet lay id,cha biet dc, hoi giong phan quyen, hoi giong bao mat
UserSchema.methods.getSignedJWT = function () {
  return jwt.sign({ id: this._id }, configs.JWT_SECRET, {
    expiresIn: configs.JWT_EXPIRE,
  });
};
//Tao mat khau moi va dua vao trong db
UserSchema.methods.UpdatePwNew = async function (user) {
  var isMatch = await bcrypt.compare(user.passWord, this.passWord);
  if (!isMatch) {
    var salt = bcrypt.genSaltSync(configs.saltRounds);
    user.passWord = bcrypt.hashSync(user.passWord, salt);
    return user;
  }
  user.passWord = this.passWord;
  return user;
};
//Gui ve client 1 token cho phep giu truy cap quyen thay doi passWord
UserSchema.methods.resetPassword = function () {
  console.log("5");
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPassToken = crypto
    .createHash("sha256") //Thuat toan su dung de ma hoa
    .update(resetToken)
    .digest("hex");
  this.resetPassTokenExp = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

UserSchema.statics.findByCredentinal = async function (usern, pass) {
  if (!usern || !pass) {
    return { error: "khong de trong user va password" };
  }
  // console.log(usern);
  let user = await this.findOne({ userName: usern });
  // console.log(user);

  if (!user) {
    return { error: "user khong ton tai" };
  }
  let isMatch = await bcrypt.compare(pass, user.passWord);
  console.log(isMatch);
  if (!isMatch) {
    return { error: "password sai" };
  }
  return user;
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
