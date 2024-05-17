const { CustomApiError } = require("../errors/custom_error")
const errorHandlerMiddleware = (err, req, res, next) => {

    if (err instanceof CustomApiError) {
        return res.status(err.statusCode).json({
            status: false,
            msg: err.message
        })
    }
    else {
        return res.status(500).json({
            status: false,
            msg: `something went wrong and its message --> ${err.message}`
        })
    }

}

// الفكره هذا المدلوير انو اي ايرر يصير خلال عمل الريكويس رااح يرح الى مدلوير افتراضيه من قبل الاكسبرس تهندله بشكل معين
// اني هنا اريد اهندل الايرور بشكل مختلف و من مكان واحد

module.exports = errorHandlerMiddleware;
