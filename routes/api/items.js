var multer  = require('multer')
const storage = multer.diskStorage({
    destination: "./uploads",
    filename(req, file, cb) {
        let newName = Date.now() + "-" + file.originalname;
        newName = newName.split(" ").join("_");
        cb(null, newName);
    },
});
const upload = multer({ storage });

const {getItems, postItem, deleteItem, othersItems, favouriteItem, unfavouriteItem, fetchFavouriteItems} = require("../../controllers/item");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = process.env.SECRET_KEY;

// Load User model
const Item = require("../../models/Item");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/postItem/:id",upload.single('image'), postItem);
router.get("/getItems/:id",getItems);
router.post("/deleteItem/:id",deleteItem);
router.get("/othersItems/:id",othersItems);
router.get("/fetchFavouriteItems/:userid",fetchFavouriteItems);
router.post("/favouriteItem/:id",favouriteItem);
router.post("/unfavouriteItem/:id",unfavouriteItem);


module.exports = router;