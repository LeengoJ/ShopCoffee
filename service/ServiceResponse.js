class Response{
    isSuccess; 
    error;
    data;
    constructor(isSuccess, error, data) {
        this.isSuccess = isSuccess;
        this.error = error;
        this.data = data;
    }
}
module.exports.Response = Response;
const MESSAGE = module.exports.Message={
    SYSTEM_ERROR:"Lỗi hệ thống",
}

module.exports.Success = function (data) {
    return new Response(true, null, data);
}
module.exports.Fail = function (error) {
    return new Response(false, error, null);
}
module.exports.SystemError = function () {
    return new Response(false, MESSAGE.SYSTEM_ERROR , null);
}