let mongoose = require("mongoose");

//Set campgroounds Schema
let campgroundSchema = new mongoose.Schema({
    name : String,
    image : String,
    desc : String,
    author : {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username : String
    },
    comment : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }]

}) ;

// Set up model , passing the definition of schema

module.exports = mongoose.model("Campgrounds", campgroundSchema );

