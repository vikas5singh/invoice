const express = require('express');
const router = express.Router();

const validators = require('./validators/invoice.validation');
const controller = require("./controllers");
const authorizer = require("../../middleware/authentication");

router.post('/generate',authorizer,validators.createInvoice, controller.invoice);
module.exports = router;