const mongoose = require("mongoose");

module.exports = mongoose.model("users", 
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hostelName:{
      type: String,
      required: true,
    },
    roomNumber:{
      type: Number,
      required: true,
    },
    phoneNumber:{
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    lendItems:[
      {
      type: mongoose.Schema.Types.ObjectId,
      ref:"items"
      }
    ]

  })
);

