module.exports = {
  showResult: (res, statusCode, success, message, data) => {
    res.status(statusCode).send({
      success: success,
      data: data,
      message: message,
    });
  },
};
