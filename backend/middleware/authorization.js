const jwt = require("jsonwebtoken")
require("dotenv").config()

const createToken = (userId) => {
    return jwt.sign(userId, process.env.JWT_SECRET_KEY);
}
exports.createToken = createToken;

function verifyToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(400).send("No token provided")
        return
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(400).send("Invalid Token")
            return
        }
        req.body.decoded = decoded // UserID is decoded
        next()
    })
}

exports.verifyToken = verifyToken;