require("dotenv").config();
const awsSDK = require("aws-sdk");
const mime = require("mime-types");
const jwt = require("jsonwebtoken");
const keys = process.env.SECRET_KEY;
// Load User model
const Item = require("../models/Item");
const User = require("../models/User");
const fs = require("fs");

exports.getItems = async function (req, res) {
  // query mongoDB (req.body.itemID) and send it in res
  // user.findOne({id = req.body.ID}) => (user) user.Items
    try {
        const items = await Item.find({owner: req.params.id});
        return res.status(200).send(items);
    } catch (e) {
        console.log(e);
    }  
}

exports.othersItems = async function (req, res) {
      try {
          const items = await Item.find({owner: {$ne: req.params.id}});
          return res.status(200).send(items);
      } catch (e) {
          console.log(e);
      }  
}

// exports.searchItems = async function (req, res) {
//     try {
//         const items = await Item.find({name: "/"+req.params.val+"/i"}).exec();
//         return res.status(200).send(items);
//     } catch (e) {
//         console.log(e);
//     }  
// }

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
        owner: req.params.id
        });
        await newItem.save();
        await User.findByIdAndUpdate(req.params.id,{$push:{lendItems:newItem.id}});
        // await user.lendItems.push(newItem.id);
        // await user.save();
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
        User.findByIdAndUpdate(req.params.id, { $pull: { lendItems: req.body.id } });
        return res.status(200).json({ msg:"deleted" });
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