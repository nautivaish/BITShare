require("dotenv").config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const users = require("./routes/api/users");
const items = require("./routes/api/items");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const path = require("path");
// app.use(express.static(path.join(__dirname, 'client', 'build'))); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/items", items);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));