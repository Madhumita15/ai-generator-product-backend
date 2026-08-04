const { json } = require("express");
const User = require("../models/user.model");
const httpStatusCode = require("../utils/httpStatusCode");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "Email already exist",
        });
      }
      const salt = 10;
      const hashPassword = await bcryptjs.hash(password, salt);

      const createUser = new User({
        name: name,
        email: email,
        password: hashPassword,
      });

      const newUser = await createUser.save();
      const token = jwt.sign(
        {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" },
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(httpStatusCode.CREATE).json({
        status: true,
        message: "User created acount successfully!",
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        token: token,
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return (
          res.status(httpStatusCode.NOT_FOUND).
          json({
            status: false,
            message: "User not found",
          })
        );
      }
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "Invalid credentials",
        });
      }
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" },
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(httpStatusCode.OK).json({
        status: true,
        message: "Login Successfully!",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token: token,
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getProfile(req, res) {
    try {
      const id = req.user.id;
      const user = await User.findById(id);
      if (!user) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          status: false,
          message: "User Not found",
        });
      } else {
        return res.status(httpStatusCode.OK).json({
          status: true,
          message: "User get successfully!",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      });
      return res.status(httpStatusCode.OK).json({
        status: true,
        message: "Logout successfully!",
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new UserController();
