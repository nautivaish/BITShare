require("dotenv").config();
const awsSDK = require("aws-sdk");
const mime = require("mime-types");
const jwt = require("jsonwebtoken");
const keys = process.env.SECRET_KEY;
// Load User model
const Item = require("../models/Item");
const fs = require("fs");

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
        await uploadFile(req.file.filename, req.file.path);
        const image = "https://bitshareportal.s3.ap-south-1.amazonaws.com/" + req.file.filename;
        fs.unlinkSync(req.file.path);
        const newItem = new Item({
        name: req.body.name,
        price: req.body.price,
        image,
        });
        await newItem.save();
        return res.status(200).json(newItem);
    } catch (e) {
        console.log(e);
    }
     
 }
 exports.deleteItem = async function (req, res) { 
    // get req.body.name,req.body.price etc. and create a new Item in mongoDB and send the item back in res
     try { 
        //console.log(req.body.id);
        await Item.deleteOne({ _id: req.body.id });
        return res.status(200).json({msg:"deleted"});
    } catch (e) {
        console.log(e);
    }
     
 }
 function uploadFile(filename, fileDirectoryPath) {
    awsSDK.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    });
     const s3 = new awsSDK.S3();
     console.log("in");

    return new Promise(function (resolve, reject) {
        fs.readFile(fileDirectoryPath.toString(), function (err, data) {
            if (err) {
                reject(err);
            }
            const conType = mime.lookup(fileDirectoryPath);
            s3.putObject(
                {
                    Bucket: "bitshareportal",
                    Key: filename,
                    Body: data,//LOL
                    ContentType: conType,
                    ACL: "public-read",
                },
                function (err, data) {
                    if (err) reject(err);
                    resolve("successfully uploaded");
                }
            );
        });
    });
}