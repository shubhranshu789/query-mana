const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema.Types

const feedSchema = new mongoose.Schema({
    body:{
        type : String,
        require:true
    },
    postedBy:{
        type : ObjectId,
        ref:"USER"
    }
})

mongoose.model("FEEDB" , feedSchema)