const { sendSuccessResponse, sendErrorResponse } = require(".");
function wrapResponse(req, res) {
    res.success = function (msg, options = {}) {
        let { code } = options;
        let statusCode = code || 200;
        return sendSuccessResponse(msg, res, options)
    }

    res.error = function (msg, ...options) {
        let { code } = options;
        let statusCode = code || 400;
        if (typeof msg !== 'string') {
            return res.status(statusCode).send(msg)
        } else {
            return sendErrorResponse(msg, res, options);
        }
    }
    return res;
}

module.exports = wrapResponse;
