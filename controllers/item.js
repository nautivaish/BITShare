const jwt = require("jsonwebtoken");
const keys = process.env.SECRET_KEY;
// Load User model
const Item = require("../models/Item");

exports.getItems = async function (req, res) {
  // query mongoDB (req.body.itemID) and send it in res
    try {
        const items = await Item.find({});
        // res.send(items)
        // res.status(200);
        return res.status(200).send(items);
    } catch (e) {
        console.log(e);
    }
    
 //return Item.find().toArray();    
}
// router.get("/",  async (req, res) => {
//     const contactList  = await User.find({}) //coming from mongoose 
//     res.send(contactList)
//   })

exports.postItem = async function (req, res) { 
    // get req.body.name,req.body.price etc. and create a new Item in mongoDB and send the item back in res
    try { 
        const newItem = new Item({
        name: req.body.name,
        price: req.body.price
        });
        await newItem.save();
        return res.status(200).json(newItem);
    } catch (e) {
        console.log(e);
    }
     
 }