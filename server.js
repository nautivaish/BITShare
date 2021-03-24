require("dotenv").config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const users = require("./routes/api/users");
const items = require("./routes/api/items");
const errorHandler = require("./controllers/error");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Mongoose
const db = process.env.MONGO_URI;
mongoose.connect(
    db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// const path = require("path");
// app.use(express.static(path.join(__dirname, 'client', 'build'))); 



app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/items", items);

app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
  
  app.use(errorHandler);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));