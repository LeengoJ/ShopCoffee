module.exports = {
  showResult: (res, statusCode, success, message, data) => {
    res.status(statusCode).send({
      success: success,
      data: data,
      message: message,
    });
  },
  success: (res, data) => {
    res.status(200).send({ data, message: "", status: "success" });
  },
  fail: (res, message, ststusCode = 500) => {
    res.status(ststusCode).send({ data: {}, message, status: "fail" });
  },
  systemError: (res) => {
    res.status(500).send({ data: {}, message: "Lỗi hệ thống", status: "fail" });
  },
};
