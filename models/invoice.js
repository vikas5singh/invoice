const mongoose = require('mongoose');

let invoiceSchema = mongoose.Schema(
    {
    invoiceNumber: { type: Number },
    invoiceName: { type: String },
    user:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
    amount:{type:Number,default:0},
    tax:{type:Number, default:0},
    status:{type:String, enum:["paid","pending"], default:"paid"},
    },
    {
        timestamp:true,
        versionKey: false,
    }
    );
const Invoice = module.exports = mongoose.model('invoice', invoiceSchema);

module.exports.fetchOne = (data) => {
   return Invoice.findOne(data)
}

module.exports.createInvoice = (data,callback) => {
   Invoice.create(data).then((res)=>{
      callback(null, res)
   }).catch((err)=>{
 callback(err)
   })
}

