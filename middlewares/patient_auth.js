const jwt = require('jsonwebtoken');
// the purpose of this middleware is to ensure that only authenticated user can acess specific route
// authentication in wich form
// authentication when they have a valid token that was generated when they sign up and login

const patientAuth = (req, res, next) => {
    try {
        // first we check the token and verufy it
        const token = req.header("Authorization")
        if (!token) return res.status(401).json({
            status: false,
            msg: "Not Authenticated, token is required"
        })
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!verified) return res.status(401).json({
            status: false,
            msg: "Not Authenticated, invalid token"
        })
        // after successful verification we can obtain the payload info
        // add this user id to the req metadata
        req.userId = verified.id;
        next()
    } catch (error) {
        return res.status(500).json({
            status:false,
            msg: errorerror.message
        })
    }
}

module.exports = patientAuth;
