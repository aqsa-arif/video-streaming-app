const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['auth-token']; 

        if (!token) return res.status(401).send({
            success: false,
            message: "Token not found, Please Login first.",
        })

        const userid = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = userid; 
        next();

    } catch (error) {
        const status = error.status || 500;
        const message = error.message || "Something went wrong"
        res.status(status).send({
            success: false,
            message: message,
        })
    }

}

module.exports = verifyToken;