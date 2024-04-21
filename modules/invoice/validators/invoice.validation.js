const Joi = require('joi');
const { validateSchema } = require('../../../validators/validator');
const logger = require('../../../config/logger');

const createInvoice = (req, res, next) => {
    req.logAction = {apiModule: "invoice", apiHandler: "createInvoice"};
    try {
        logger.info(req.logAction, { REQUEST_BODY: req.body });
        const schema = Joi.object().keys({
        invoiceName: Joi.string().required(),
        amount: Joi.number().required(),
        tax: Joi.number().required(),
        status: Joi.string().valid('paid', 'pending').required()
        });

        let validFields = validateSchema(req.body, schema);
        if (validFields) {
            next();
        }
    } catch (error) {
        logger.error(req.logAction, "User invoice validation Error", "ERROR" + ":" + error.message, "STACK" + ":" + error.stack);
        return res.error(error);
    }
};
module.exports = {
    createInvoice,
};