const Joi = require('joi');
const { password} = require('./custom.validation');
const { validateSchema } = require('../../../validators/validator');
const logger = require('../../../config/logger');

const login = (req, res, next) => {
    req.logAction = { apiModule: "auth", apiHandler: "login" };
    try {
        logger.info(req.logAction, { REQUEST_BODY: req.body });
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().custom(password)
        });
        let validFields = validateSchema(req.body, schema);
        if (validFields)
            return next();
    }
    catch (error) {
        logger.error(req.logAction, "User login validation Error", "ERROR" + ":" + error.message, "STACK" + ":" + error.stack);
        return res.error(error);
    }
};

const createUser = (req, res, next) => {
    req.logAction = {apiModule: "auth", apiHandler: "signup"};
    try {
        logger.info(req.logAction, { REQUEST_BODY: req.body });
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().custom(password),
            name: Joi.string().required(),
        });

        let validFields = validateSchema(req.body, schema);
        if (validFields) {
            next();
        }
    } catch (error) {
        logger.error(req.logAction, "User Signup validation Error", "ERROR" + ":" + error.message, "STACK" + ":" + error.stack);
        return res.error(error);
    }
};
module.exports = {
    createUser,
    login,
};