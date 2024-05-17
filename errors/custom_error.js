class CustomApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// this the custom error

// create a function which return a customerrormessage depending on specific arguement

const createCustomApiError = (message, statusCode) => new CustomApiError(message, statusCode);

module.exports = {createCustomApiError, CustomApiError};
