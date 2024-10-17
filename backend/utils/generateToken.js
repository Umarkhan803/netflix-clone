const jwt = require("jsonwebtoken");
const ENV_VARS = require("../config/config");

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" }); //creating token

  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    saneSite: "strick",
    secure: ENV_VARS.NODE_ENV,
  });
  return token;
};

module.exports = generateToken;
