const {register,login} = require("../../controllers/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = process.env.SECRET_KEY;
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", register);
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", login);
module.exports = router;