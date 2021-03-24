const mongoose = require("mongoose");

module.exports = mongoose.model("items",
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
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    isBorrowed:{
      type: Boolean,
      required: true,
      default: false
    },
    requests:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
      }
    ],
    borrower:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"users"
    }
  })
);
// for each item we maintain a state boolean- true then it is currently borrowed and in this case we have to show returned 
// button instead of delete. Also we dont show these items in search page. Item has a req array
// when a user requests an item, append borrower id to request. and when lender accepts -state change, delete from req . rejects - just delete the request
// for borrower he sees all items that he has requested, for the items with state true we show borrowed with state 0 we show requested
//  suppose two users request for same item, lender accepts one, so we delete all reqs on same item.
