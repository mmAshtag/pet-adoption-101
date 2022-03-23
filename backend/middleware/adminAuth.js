const jwt = require("jsonwebtoken");
require("dotenv").config();

const createAdminToken = (userName) => {
  return jwt.sign(userName, process.env.JWT_ADMIN_SECRET_KEY);
};
exports.createAdminToken = createAdminToken;

function verifyAdminToken (req, res, next)  {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(400).send("No admin token provided");
    return;
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(400).send("Invalid Admin Token");
      return;
    }
    req.body.decoded = decoded; // UserID is decoded
    next();
  });
}
exports.verifyAdminToken = verifyAdminToken;