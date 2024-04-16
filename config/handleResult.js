module.exports = {
  showResult: (res, statusCode, success, data) => {
    res.status(statusCode).send({
      success: success,
      data: data,
    });
  },
};
