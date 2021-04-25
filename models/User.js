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
    ],
    requestedItems:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"items"
      }
    ],
    currentlyBorrowedItems:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"items"
      }
    ],
    requests:[
      {
        type: String 
      }
    ],
    previouslyBorrowedItems:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"items"
      }
    ],
    favouriteItems:[
      {
      type: mongoose.Schema.Types.ObjectId,
      ref:"items"
      }
    ]
  })
);
// for each item we maintain a state boolean- true then it is currently borrowed and in this case we have to show returned 
// button instead of delete. Also we dont show these items in search page.
// when a user requests an item, append borrower id to request. and when lender accepts -state change, delete from req . rejects - just delete the request
// for borrower he sees all items that he has requested, for the items with state true we show borrowed with state 0 we show requested
//  suppose two users request for same item, lender accepts one, so we delete all reqs on same item.
