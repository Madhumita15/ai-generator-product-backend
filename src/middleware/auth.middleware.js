require("dotenv").config();

const httpStatusCode = require("../utils/httpStatusCode");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

class AuthMiddleware {
  static async verifyToken(req, res, next) {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          status: false,
          message: "Authentication required.",
        });
      }
      const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decode.id);
      if (!user) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          status: false,
          message: "User not found",
        });
      }
      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
      next();
    } catch (error) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        status: false,
        message: "Invalid or expired token",
      });
    }
  }
}
module.exports = AuthMiddleware;
