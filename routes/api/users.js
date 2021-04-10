const {register,login,getOwner,getRequests,getMyRequests,postRequest,deleteRequest} = require("../../controllers/user");
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
router.get("/getRequests/:id",getRequests);
router.get("/getMyRequests/:id",getMyRequests);
router.post("/postRequest/:id",postRequest);
router.post("/deleteRequest/:id",deleteRequest);
module.exports = router;