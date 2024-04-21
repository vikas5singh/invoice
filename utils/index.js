const moment = require('moment-timezone');
const _ = require('lodash');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

let sendSuccessResponse = (message, res, data) => {
    var resData = {
        status: "success",
        status_code: 200,
        message: (message),
        data: !_.isEmpty(data) ? data : {},
    };
    return res.status(200).send(resData);
};
let sendErrorResponse = function (err, res, data) {
    let code = (typeof err === 'object') ? (err.code) ? err.code : 500 : 400;
    let message = (typeof err === 'object') ? (err.message ? err.message : 'Internal Server Error') : err;

    var resData = {
        status: "failure",
        status_code: code,
        message: (message),
        data: !_.isEmpty(data) ? data : {},
    };

    return res.status(code).send(resData);
};

let roundNumber = (num) => {
    return Math.round(num * 100) / 100;
}

let generatorRandomNumber = (length) => {
    if (typeof length == "undefined")
        length = 2;
    var token = "";
    var possible = "123456789";
    for (var i = 0; i < length; i++)
        token += possible.charAt(Math.floor(Math.random() * possible.length));
    return token;
};

// "DD-MM HH:mm:ss.SSS"
const getLoggingTime = () => {
    let date = new Date();
    return pad(date.getUTCMonth() + 1)
        + '-' + pad(date.getUTCDate())
        + ' ' + pad(date.getUTCHours())
        + ':' + pad(date.getUTCMinutes())
        + ':' + pad(date.getUTCSeconds())
        + '.' + String((date.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5);
}

const pad = (number) => {
    var r = String(number);
    if (r.length === 1) {
        r = '0' + r;
    }
    return r;
}

const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};
const verifyPassword = async (hashedPassword, password) => {
    const validPassword = await bcrypt.compare(password, hashedPassword);
    return validPassword;
};

const generateToken = (user, expiresIn = '30d') => {
    return jwt.sign(
        {
            id : user.id,
            user_name : user.user_name,
            first_name : user.first_name,
            last_name : user.last_name,
            email : user.email,
            role : user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: expiresIn }
    );
};
const verifyToken = (token) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );
};

const generateHashKey = (length = 30, start_with = "tok") => {
    return start_with + crypto.randomBytes(length).toString('hex');
};

module.exports = {
    sendErrorResponse,
    sendSuccessResponse,
    roundNumber,
    generatorRandomNumber,
    getLoggingTime,
    hashPassword,
    verifyPassword,
    generateToken,
    verifyToken,
    generateHashKey,
}
