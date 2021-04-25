require("dotenv").config();
const awsSDK = require("aws-sdk");
const mime = require("mime-types");
const jwt = require("jsonwebtoken");
const keys = process.env.SECRET_KEY;
// Load User model
const Item = require("../models/Item");
const User = require("../models/User");
const fs = require("fs");

exports.getItems = async function (req, res,next) {
  // query mongoDB (req.body.itemID) and send it in res
  // user.findOne({id = req.body.ID}) => (user) user.Items
    try {
        Item.find({owner: req.params.id}).populate('requests','name').exec(function (err, items) {
            if (err) return next(err);
            // console.log('The stories are an array: ', stories);
            return res.status(200).send(items);
          });
        
    } catch (e) {
        console.log(e);
    }  
}
exports.requestedItems = async function (req, res,next) {
      try {
              User.findOne({_id: req.params.userId}).populate('requestedItems').exec(function (err, items) {
            //   console.log(items);
              if (err) return next(err);
              return res.status(200).send(items);
            });
          
      } catch (e) {
          console.log(e);
          next(e);
      }  
}
exports.previousItems = async function (req, res,next) {
    try {
            User.findOne({_id: req.params.userId}).populate('previouslyBorrowedItems').exec(function (err, items) {
          //   console.log(items);
            if (err) return next(err);
            return res.status(200).send(items);
          });
        
    } catch (e) {
        console.log(e);
        next(e);
    }  
}
exports.borrowedItems = async function (req, res, next) {
    try {
            User.findById(req.params.userId).populate('currentlyBorrowedItems').exec(function (err, items) {
            if (err) return next(err);
            // console.log('The stories are an array: ', stories);
            return res.status(200).send(items);
          });
        
    } catch (e) {
        console.log(e);
    }  
}

exports.othersItems = async function (req, res) {
      try {
          const items = await Item.find({owner: {$ne: req.params.id}, isBorrowed: false});
          return res.status(200).send(items);
      } catch (e) {
          console.log(e);
      }  
}


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
        owner: req.params.id,
        tags: req.body.tags.split(",")
        });
        console.log(newItem.tags)
        await newItem.save();
        await User.findByIdAndUpdate(req.params.id,{$push:{lendItems:newItem.id}});
        // await user.lendItems.push(newItem.id);
        // await user.save();
        return res.status(200).json(newItem);
    } catch (e) {
        console.log(e);
        return next({status: 400, msg: e });
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

 exports.favouriteItem = async function (req, res) { 
    // get req.body.name,req.body.price etc. and create a new Item in mongoDB and send the item back in res
    try { 
        console.log("Yo"); console.log(req.body.id);
        await User.findByIdAndUpdate(req.params.id, {$push: {favouriteItems: req.body.id}});
        return res.status(200).json({msg:"favourited"});
    } catch (e) {
        console.log(e);
    }
     
 }

 exports.unfavouriteItem = async function (req, res) { 
    try { 
        console.log("Yo2"); console.log(req.body.id);
        await User.findByIdAndUpdate(req.params.id, { $pull: { favouriteItems: req.body.id } });
        return res.status(200).json({ msg:"deleted" });
    } catch (e) {
        console.log(e);
        return next(e);
    }
     
 }
 exports.acceptRequest = async function (req, res,next) { 
     try { 
        const item = await Item.findById(req.body.id);
        const borrower = await User.findById(req.params.borrowerId);
        if(item.isBorrowed === true){
            throw "Cannot accept the request for a currently borrowed item!";
        }
        item.isBorrowed = true;        
        item.borrower = borrower._id;
        await item.save();
        await Item.findByIdAndUpdate(req.body.id,{$pull:{requests:req.params.borrowerId}});
        await User.findByIdAndUpdate(req.params.borrowerId,{$pull:{requestedItems:req.body.id}});
        await User.findByIdAndUpdate(req.params.borrowerId,{$push:{currentlyBorrowedItems:req.body.id}});
        return res.status(200).json({ msg:"accepted request" });
    } catch (e) {
        console.log(e);
        return next(e);
    }
     
 }
 exports.rejectRequest = async function (req, res,next) { 
    // get req.body.name,req.body.price etc. and create a new Item in mongoDB and send the item back in res
     try { 
        
        await Item.findByIdAndUpdate(req.body.id,{$pull:{requests:req.params.borrowerId}});
        await User.findByIdAndUpdate(req.params.borrowerId,{$pull:{requestedItems:req.body.id}});
        return res.status(200).json({ msg:"rejected request" });
    } catch (e) {
        console.log(e);
        return next(e);
    }
     
 }
 exports.requestItem = async function (req, res) { 
    // get req.body.name,req.body.price etc. and create a new Item in mongoDB and send the item back in res
     try { 
        //console.log(req.body.id);
        // const item = await Item.findOne({ _id: req.body.id });
        await User.findByIdAndUpdate(req.params.userId,{$pull:{requestedItems:req.body.id}});
        await Item.findByIdAndUpdate(req.body.id,{$push:{requests:req.params.userId}});
        await User.findByIdAndUpdate(req.params.userId,{$push:{requestedItems:req.body.id}});
        return res.status(200).json({ msg:"requested" });
    } catch (e) {
        console.log(e);
    }
     
 }

 exports.fetchFavouriteItems = async function(req, res) {
     try {
         User.findOne({_id: req.params.userid}).populate('favouriteItems').exec((err,myUser) => {
         if (err) return next(err); 
        //  console.log(myUser.favouriteItems);
         return res.status(200).json(myUser.favouriteItems);
         
         })
     } catch (e) {
         console.log(e);
     }
 }

 exports.returnItem = async function (req, res,next) { 
    // get req.body.name,req.body.price etc. and create a new Item in mongoDB and send the item back in res
     try { 
        const item = await Item.findById(req.body.id);
        item.isBorrowed = false;
        await User.findByIdAndUpdate(item.borrower,{$pull:{currentlyBorrowedItems:item._id}});
        await User.findByIdAndUpdate(item.borrower,{$push:{previouslyBorrowedItems:item._id}});
        item.save();
        return res.status(200).json({ msg:"returned" });
    } catch (e) {
        console.log(e);
        return next(e);
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