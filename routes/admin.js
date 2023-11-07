const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const ADMIN = mongoose.model("ADMIN");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys");
const requireLoginAdmin = require("../middlewares/requireLoginAdmin")
const POST = mongoose.model("POST");




// router.get("/allquery", (req, res) => {
//     POST.find()
//     .populate("postedBy" , "_id name phone address")
//     .then(posts => res.json(posts))
//     .catch(err => console.log(err))
//  });






module.exports = router;
