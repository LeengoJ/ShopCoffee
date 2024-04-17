let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let mongoose = require("mongoose");
let config = require("./config/configs");
let app = express();
const indexRouter = require("./routes/index.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(helmet());
// app.use(xss());
// app.use(cors());

app.use("/api", indexRouter);

mongoose.connect(config.DB_URL + config.DB_NAME);
mongoose.connection
  .once("open", () => {
    console.log("Connected!");
  })
  .on("error", () => {
    console.log("Fail!");
  });
const Port = 3000;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
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
