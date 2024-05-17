const {doctorSignUp, doctorSingIn} = require("../controllers/doctor/doctor_auth_controller")
const express = require('express');
const doctorAuthRouter = express.Router();

doctorAuthRouter.route("/signup").get(doctorSignUp);
doctorAuthRouter.route("/signin").get(doctorSingIn);


module.exports = doctorAuthRouter
