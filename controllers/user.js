const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY;
const saltRounds = 10;
const expiresIn = 31556926; // 1 year in seconds

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/User");

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

exports.register = register;
exports.login = login;