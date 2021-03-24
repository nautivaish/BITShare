const {register,login,getOwner} = require("../../controllers/user");
const express = require("express");
const router = express.Router();
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", register);
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", login);
router.get("/getOwner/:id",getOwner);
module.exports = router;