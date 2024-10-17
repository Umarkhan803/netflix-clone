const express = require("express");
const { signup, login, logout } = require("../controllers/auth.controllers");

const router = express.Router();

// Signup API
router.post("/signup", signup);

// Login API
router.post("/login", login);

// Logout API
router.post("/logout", logout);

// exporting modules
module.exports = router;
