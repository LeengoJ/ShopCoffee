// var express = require("express");

// var router = express.Router();
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });
// const upload = multer({ storage: storage });

// router.post("/Account/setAvatar", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   res.send("Image uploaded successfully!");
// });
// module.exports = router;
const multer = require("multer");
const path = require("path");
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images/thankscard");
  },
  filename: (req, file, cb) => {
    cb(null, "event" + Date.now() + path.extname(file.originalname));
  },
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images/invitecard");
  },
  filename: (req, file, cb) => {
    cb(null, "event" + Date.now() + path.extname(file.originalname));
  },
});
const dowloadimg = {
  uploadinvitecard: multer({
    storage: storage,
    limits: { fileSize: "10000000" },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const mimeType = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));

      if (mimeType && extname) {
        return cb(null, true);
      }
      cb("Give proper files formate to upload");
    },
  }),
  uploadthankscard: multer({
    storage: storage1,
    limits: { fileSize: "1000000" },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const mimeType = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));
      if (mimeType && extname) {
        return cb(null, true);
      }
      cb("Give proper files formate to upload");
    },
  }),
};
module.exports = dowloadimg;
