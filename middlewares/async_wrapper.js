const asyncWrapper = (fun) => {
    return async (req, res, next) => {
        try {
            await fun(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper;

// we will replace this middleware with a specific package called
// express_async_error
// it is only required to import this package and throw error when appropriat
// and express-asnc-error will do the magic it will catch this error and handle it
// using our custom express error handler or the default express handler in express
