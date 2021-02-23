const {getItems, postItem} = require("../../controllers/item");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = process.env.SECRET_KEY;

// Load User model
const Item = require("../../models/Item");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/postItem", postItem);
router.get("/getItems",getItems);

module.exports = router;