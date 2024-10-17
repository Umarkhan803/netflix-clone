const User = require("../model/user.model");
const bcryptjs = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// SignUp  controller

const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body; //collecting the user data

    // checking the fields are present
    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, massage: "All fields  are required" });
    }

    // checking email validation
    const emailRegex = /^[^\$@]+@[^\$@]+\.[^\$@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, massage: "Invalid email" });
    }

    // checking password length
    if (password < 6) {
      return res.status(400).json({
        success: false,
        massage: "password must be al least 6 character",
      });
    }

    // checking weather the user email is already exists
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        massage: "Email already exists",
      });
    }

    // checking weather the user name is already exists
    const existingUserByName = await User.findOne({ userName: userName });
    if (existingUserByName) {
      return res.status(400).json({
        success: false,
        massage: "userName already exists",
      });
    }

    // encrypting password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = [];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    // creating user Profile
    const newUser = new User({
      email,
      password: hashedPassword,
      userName,
      image,
    });

    // token

    generateToken(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res
      .status(500)
      .json({ success: false, massage: "Internal server error", error });
  }
};

const login = async (req, res) => {};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ success: true, message: "Logged out Successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.massage);
    res.status(500).json({ success: false, massage: "Internal server error " });
  }
};

// exporting function
module.exports = { signup, login, logout };
