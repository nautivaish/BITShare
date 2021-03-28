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

const {getItems, postItem, deleteItem, othersItems, favouriteItem, unfavouriteItem, fetchFavouriteItems,requestItem,requestedItems,borrowedItems,previousItems,acceptRequest,rejectRequest,returnItem } = require("../../controllers/item");

const express = require("express");
const router = express.Router();

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
router.post("/requestItem/:userId", requestItem);
router.get("/requestedItems/:userId", requestedItems);
router.get("/borrowedItems/:userId", borrowedItems);
router.get("/previousItems/:userId", previousItems);
router.post("/acceptRequest/:borrowerId",acceptRequest);
router.post("/rejectRequest/:borrowerId",rejectRequest);
router.post("/returnItem/",returnItem);

// router.get("searchItems/:val", searchItems);

module.exports = router;