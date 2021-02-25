const mongoose = require("mongoose");

module.exports = mongoose.model(
  "items",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image:{
      type: String,
      required: true,
    }
  })
);
