const mongoose = require('mongoose');

let userSchema = mongoose.Schema(
    {
    name: { type: String, require:true },
    email: { type: String, lowercase: true, trim: true },
    password:{type:String},
    status:{type:String, enum:["active","inactive"], default:"active"},
    },
    {
        timestamp:true,
        versionKey: false,
    }
    );
const User = module.exports = mongoose.model('User', userSchema);

module.exports.fetchOne = (data) => {
   return User.findOne(data)
}

module.exports.createUser = (data,callback) => {
   User.create(data).then((res)=>{
      callback(null, res)
   }).catch((err)=>{
 callback(err)
   })
}

module.exports.fetchOneWithoutPassword = (data) => {
   return User.findOne({email:data}).select({password:0});
}
