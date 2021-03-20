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

const { getItems, postItem, deleteItem, othersItems } = require("../../controllers/item");
// const {getItems, postItem, deleteItem, othersItems, searchItems} = require("../../controllers/item");
const express = require("express");
const router = express.Router();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/postItem/:id", upload.single('image'), postItem);
router.get("/getItems/:id", getItems);
router.post("/deleteItem/:id", deleteItem);
router.get("/othersItems/:id", othersItems);
// router.get("searchItems/:val", searchItems);

module.exports = router;