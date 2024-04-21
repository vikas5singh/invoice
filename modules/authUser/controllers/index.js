const utils = require('../../../utils');
const logger = require('../../../config/logger');
const userModel = require("../../../models/users");
const sendEmail = require("../../../lib/nodemailer");
module.exports = {
    logIn: async (req, res) => {
        try {
            const body = req.body;
            const conditions = { email: body.email }
            const user = await userModel.fetchOne(conditions);
            if (!user)
                return res.error("Invalid email or password. Please try again.");
            const isPasswordValid = await utils.verifyPassword(user.password, body.password);
            if (!isPasswordValid) 
                return res.error("Invalid email or password. Please try again.");
            if (user.status === "inactive")
                return res.error("Your account is inactive. Please contact the administrator.");
            const token = utils.generateToken(user);
            return res.success("Login successful!", { token });
        }
        catch (error) {
            logger.error(req.logAction, "User Login Error", "ERROR: " + error?.message || "----", "STACK: " + error?.stack || "----");
            res.error(error);
        }
    },

    signUp: async (req, res) => {
        try {
            let data = req.body;
            let user = await userModel.fetchOne({email:data.email});
            if(user) return res.error("User exists with Email!")
            let getHash = await utils.hashPassword(data.password);
                data.password = getHash;
            userModel.createUser(data, (err, result)=>{
                if(err){
                   return res.error("Database error!",err);
                }
                 return res.success("User create successfuly!",result);
            }); 
        }
        catch (error) {
            logger.error(req.logAction, "User Signup Error", "ERROR" + ":" + error.message, "STACK" + ":" + error.stack);
            res.error(error);
        }
    },

    profile: async (req, res) => {
        try {
            let data = req.user;
            let user = await userModel.fetchOneWithoutPassword(data.email);
            if(user) {
                return res.success("User fetch successfuly!",user);
            }else{
             return res.error("User not exists !")
            }
        }
        catch (error) {
            logger.error(req.logAction, "User Signup Error", "ERROR" + ":" + error.message, "STACK" + ":" + error.stack);
            res.error(error);
        }
    },

    email: async (req, res) => {
        try {
            let data = req.user;
            let user = await userModel.fetchOneWithoutPassword(data.email);
            let time = process.env.EMAIL_TIME
            if(user) {
                setInterval(() => {
                sendEmail(user);
            },time)
                return res.success("User fetch successfuly!",user);
            }else{
             return res.error("User not exists !")
            }
        }
        catch (error) {
            logger.error(req.logAction, "User Signup Error", "ERROR" + ":" + error.message, "STACK" + ":" + error.stack);
            res.error(error);
        }
    },
}