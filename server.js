require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const users = require("./routes/api/users");
const items = require("./routes/api/items");

const app = express();
app.use(cors());
// Body parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Mongoose
const db = process.env.MONGO_URI;
mongoose.connect(
    db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/items",items);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));