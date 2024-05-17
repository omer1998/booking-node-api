const dbService = require("../../db_service");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
const asyncWrapper = require("../../middlewares/async_wrapper");
const {createCustomApiError} = require("../../errors/custom_error")

const patientSignInController = asyncWrapper(
    async (req, res, next) => {
        const { email, password } = req.body;
        const { checkUser, user } = await dbService.checkUserInDatabase(email)
        // const userObject = JSON.parse(user);
        // console.log(" --> type of user object" + typeof(userObject));
        if (checkUser) {
            // now we check the passord
            const isMatch = await bcryptjs.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "2d" })
                return res.status(200).json({
                    status: true,
                    msg: "You have successfully signed in",
                    user,
                    token
                })
            }
            else {
                // here we can create custom api error (that class that we create), and
                // let async wrapper handle this error using our custom error handler

                return next(createCustomApiError("your password is wrong", 401));
                // take a look at our error handler to see how this error converted to a json response

                // return res.status(401).json({
                //     status: false,
                //     msg: "your password is wrong"
                // })

                //
            }
        } else {
            return res.status(400).json({
                status: false,
                msg: "your email is wrong or “not yet registered”"
            })
        }

        // this error will be handled by the the asyncWapper middleware using our custom
        // error handler middleware


        // catch (error) {
        //     return res.status(500).json({
        //         status: false,
        //         msg: error.message
        //     })
        // }

    }
)

module.exports = {patientSignInController ,
    // patientSignUpController
};
