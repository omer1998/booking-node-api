const express = require("express")
const patientAuthRouter = express.Router()
const dbService = require("../db_service")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()


// controllers
const authValidationController = require("../controllers/auth_validation")
const {patientSignInController} = require("../controllers/patient/patient_auth_controller")


patientAuthRouter.post("/api/patient/signup", async (req, res) => {
    console.log("hello from signup")
    const { first_name, last_name, email, password } = req.body;
    if (first_name == null || last_name == null || email == null || password == null) return res.status(400).json({
        status: false,
        msg: "please fill all required field"
    })
    const hashPassword = await bcryptjs.hash(password, 10);
    try {
        // check user in database
        const { checkUser, user } = await dbService.checkUserInDatabase(email);
        if (checkUser) {
            return res.status(400).json({
                status: false,
                msg: "Email already exists"
            })
        }

        // const token = jwt.sign(user,process.env.JWT_SECRET_KEY || "secret",{expiresIn: "1h"})

        else {
            userSignUpData = {
                first_name,
                last_name,
                email,
                password: hashPassword
            }
            const user = await dbService.addUserToDatabase(userSignUpData)
            // console.log(`user ${user}`) //[object SequelizeInstance:users]
            // console.log(`user json ${user.toJSON()}`) //[object Object]
            console.log(`user--> ${user.toJSON()}`);
            return res.status(200).json({
                status: true,
                msg: "You have successfully signed up. Log in NOW",
                user: user.toJSON()

            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: error.message
        })
    }
})

patientAuthRouter.post("/api/patient/signin", patientSignInController)

// in order to maintain a sign in state for user we need to know if his token is valid and response accoding to that
// this process happen when the user open the app

patientAuthRouter.get("/api/patient/auth-validation", authValidationController);

module.exports = patientAuthRouter;
