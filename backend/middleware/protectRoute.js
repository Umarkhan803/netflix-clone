const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const ENV_VARS = require("../config/config");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-netflix"];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - no token provided" });
    }
    const decode = jwt.verify(token, ENV_VARS.JWT_SECRET);

    if (!decode) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Invalid Token" });
    }
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect Rout Middleware: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "internal server is Error " });
  }
};
module.exports = protectRoute;
