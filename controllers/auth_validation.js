
const asyncWrapper = require('../middlewares/async_wrapper.js')
const authValidationController = asyncWrapper(
    async (req, res) => {

        const token = req.header("Authorization")
        if (!token) return res.json(false)
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!verified) return res.json(false)
        const { checkUser, user } = await dbService.checkUserInDatabase(verified.email)
        if (!user) return res.json(false)
        return res.json(true);

        // catch (error) {
        //     res.status(500).json({
        //         status: false,
        //         msg: error.message
        //     })

        // here you ma wander how can we handle any error occur during making the request
        // the answer is simple
        // when we wrap this method controller with awyncWrapper middleware this will take the
        // responsability of make try catch functionality of the above code
        // and if there is error, it will be handled by specific custom error handler that we create
        // if we do not create a custom error handler, the error will be handled by the default error handler of the express

    }

)

module.exports = authValidationController
