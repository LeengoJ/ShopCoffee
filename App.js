let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let mongoose = require("mongoose");
let config = require("./config/configs");
let app = express();
const indexRouter = require("./routes/index.routes");
const cors = require('cors');
global.__basedir = __dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

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

module.exports = app;
