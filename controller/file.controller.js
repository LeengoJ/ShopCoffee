const fs = require("fs");
// const { promisify } = require('util');
const baseUrl = "http://localhost:3000/api/files/";
const apiResponse = require("../helper/api-response");
const uploadFile = require("../middleware/upload");
// const unlinkAsync = promisify(fs.unlink);

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
  if (req.file != undefined) {
    console.log(req.file.path);
    try{
      await uploadFile.unlinkAsync(req.file.path);
      
    }catch(err){
      console.log(err);
    }
  }
  res.send(req.body);
};
module.exports = {
  getListFiles,
  download,
  upload,
};
