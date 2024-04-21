const utils = require('../../../utils');
const logger = require('../../../config/logger');
const invoiceModel = require("../../../models/invoice");
const userModel = require("../../../models/users");
const pdfService =require("../../../service/pdfService");
module.exports = {
    invoice: async (req, res) => {
        try {
        let data = req.body
        data.invoiceNumber = await utils.generatorRandomNumber(5)
        data.user = req?.user?._id.toString();
        let invoiceDat = new invoiceModel(data);
        let invoiceData = await invoiceDat.save();
        let userData = await userModel.fetchOne({_id:req.user?._id.toString()})
        invoiceData.name = userData.name;
        invoiceData.email = userData.email;
        pdfService(invoiceData, (err, buffer) => {
        if (err) {
          return res.error('Error generating PDF');
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${data.invoiceNumber}-invoice.pdf`);
        res.send(buffer);
        });
        }
        catch (error) {
            logger.error(req.logAction, "User Invoice Error", "ERROR: " + error?.message || "----", "STACK: " + error?.stack || "----");
            res.error(error);
        }
    },

}