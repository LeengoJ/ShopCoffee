// let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
// let logger = require("morgan");
// let partials = require("express-partials");
let mongoose = require("mongoose");
// const router = require("./routes/index.routes");
// let cors = require("cors");
// let xss = require("xss-clean");
// let helmet = require("helmet");
let config = require("./config/configs");

//
// const usersRoutes = require("./user.routes");
// const authRoutes = require("./auth.routes");
// const productsRoutes = require("./product.routes");
// const tablesRoutes = require("./table.routes");
// const discountsRoutes = require("./discount.routes");

const myRouter = express.Router();
// const middleware = require("./middleware/protect");

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

let app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// app.use(partials());
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(helmet());
// app.use(xss());
// app.use(cors());

// app.use("/", indexRouter);

mongoose.connect(config.DB_URL + config.DB_NAME);
mongoose.connection
  .once("open", () => {
    console.log("Connected!");
  })
  .on("error", () => {
    console.log("Fail!");
  });

//myRouter.use(middleware.protect());

// app.use("/api", function (res, req) {
//   return "ádasdjlasjd";
// });
// router.use("/users", usersRoutes);
// router.use("/auth", authRoutes);
// router.use("/products", productsRoutes);
// router.use("/tables", tablesRoutes);
// router.use("/discounts", discountsRoutes);

// error handler
const Port = 3000;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
// app.use("/api", router);
const router = express.Router();
const authController = require("./controller/authController");

router.post("/login", authController.loginController);
router.post("/register", function (req, res) {
  console.log(req.body);
  // const result = Aawait authService.Register(req.body);

  // if (result.error) {
  //   handleResult(res, 400, false, result.error, null);
  // } else {
  //   handleResult(res, 200, true, "Đăng ký thành công", result);
  // }
});
app.use("", router);
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
