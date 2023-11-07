const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    userName:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    },
    address:{
        type: String,
        require:true
    },
    phone:{
        type: Number,
        require:true
    }
})

mongoose.model("USER" , userSchema)