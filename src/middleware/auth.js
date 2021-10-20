const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(304).send("A token is required for authentication");
  } else {
    try {
      const decoded = jwt.verify(token.split(' ')[1], "SECRET_TOKEN");
      req.user = decoded;
    } catch (e) {
      return res.status(401).send("Invalid token");
    }
    return next();
  }
};


module.exports = verifyToken