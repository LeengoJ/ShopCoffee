const fs = require("fs");
const baseUrl = "http://localhost:3000/api/files/";
const apiResponse = require("../helper/api-response");
const uploadFile = require("../middleware/upload");

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/public/upload/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/upload/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    console.log(req.files);

    if (!req.files || !req.files[0]) {
      return apiResponse.validationErrorWithData(
        res,
        "Upload a file please!",
        {}
      );
    }
    return apiResponse.successResponseWithData(
      res,
      "File Uploaded Successfully",
      { path: req.files[0].path }
    );
  } catch (err) {
    console.error("Error saving file:", err);
    return apiResponse.ErrorResponse(res, err);
  }
};
module.exports = {
  getListFiles,
  download,
  upload,
};
