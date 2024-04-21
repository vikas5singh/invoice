const express = require('express');
const router = express.Router();

const validators = require('./validators/user.validation');
const controller = require("./controllers");
const authorizer = require("../../middleware/authentication");

router.post('/login', validators.login, controller.logIn);
router.post('/signup', validators.createUser, controller.signUp);
router.get('/me', authorizer, controller.profile);
router.get('/send-email', authorizer, controller.email);
module.exports = router;