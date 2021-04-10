const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY;
const saltRounds = 10;
const expiresIn = 31556926; // 1 year in seconds

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/User");
const Item = require("../models/Item");

// REGISTER
function register(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if(!isValid)
    return res.status(400).json(errors);

  User.findOne({ email: req.body.email }).then(user => {
    if(user)
      return res.status(400).json({ email: "Email already exists" });

    const { name, email, password, hostelName, roomNumber, phoneNumber } = req.body;
    const newUser = new User({
      name, email, password, hostelName, roomNumber, phoneNumber,
      lendItems: []
    });
    
  // Hash password before saving in database
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });

  });
}

// LOGIN
function login(req, res) {
  const { errors, isValid } = validateLoginInput(req.body);

// Check validation
  if(!isValid)
    return res.status(400).json(errors);
  
  User.findOne({ email: req.body.email }).then(user => {
    if(!user)
      return res.status(404).json({ emailnotfound: "Email not found" });

    // Check password
    bcrypt.compare(req.body.password, user.password)
      .then(isMatch => {
        if(isMatch) {
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
          // Sign token
          jwt.sign(payload, key, { expiresIn },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({ passwordincorrect: "Password incorrect" });
        }
      }
    );
  });

}
exports.getOwner = async function (req, res) {
  // console.log("getOwner");
  const owner = await User.findOne({ _id: req.params.id });
  console.log(owner);
  return res.status(200).json(owner);   

  };
  exports.getRequests = async function (req, res) {
    console.log("getRequests");
    const users = await User.find({ _id: { $nin: [req.params.id ] } });
    var requests =[];
    for(var i=0; i< users.length; i++)
    {
      for(var j=0;j<users[i].requests.length;j++)
      {
        requests.push(users[i].requests[j]);
      }
    }
    console.log(requests);
    return res.status(200).json(requests);   
  
    };
  exports.getMyRequests = async function (req, res) {
    console.log("getMyRequests");
    const owner = await User.findOne({ _id: req.params.id });
    console.log(owner.requests);
    return res.status(200).json(owner.requests);   
  
    };
  exports.postRequest = async function (req, res,next) { 
    console.log("post request");
    try{
      console.log(req.body.name)
      await User.findByIdAndUpdate(req.params.id,{$push:{requests:req.body.name}});
      return res.status(200).json({msg:"req posted"});
    } 
    catch (e) {
      console.log(e);
      return next({status: 400, msg: e });
    }
  };
  exports.deleteRequest = async function (req, res,next) { 
    console.log("delete request");
    try{
      console.log(req.body.name)
      await User.findByIdAndUpdate(req.params.id,{$pull:{requests:req.body.name}});
      console.log("JJ IS DUMB");
      return res.status(200).json({msg:"req deleted "});
    } 
    catch (e) {
      console.log(e);
      return next({status: 400, msg: e });
    }
  };

exports.register = register;
exports.login = login;
