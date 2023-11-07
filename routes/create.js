const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const ADMIN = mongoose.model("ADMIN");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys");
const requireLogin = require("../middlewares/requireLogin");
const requireLoginAdmin = require("../middlewares/requireLoginAdmin")
const POST = mongoose.model("POST");

router.post("/create", requireLogin, (req, res) => {
    const { body } = req.body;
    if (!body) {
        return res.status(422).json({ error: "Please add your Query..." });
    } else {
        req.user;
        // res.json("ok")
        const post = new POST({
            body,
            postedBy: req.user,
        });
        post
            .save()
            .then((result) => {
                return res.json({ post: result });
            })
            .catch((err) => console.log(err));
    }
});


router.get("/myquery", requireLogin, (req, res) => {
    POST.find({postedBy : req.user._id})
    .populate("postedBy" , "_id name phone address" )
    .then(myposts => {
        res.json(myposts)
    })
});


router.get("/allquery", (req, res) => {
    POST.find()
    .populate("postedBy" , "_id name phone address")
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
 });



router.delete("/deletePost/:postid", (req, res) => {
    // console.log(req.params.postID)
    POST.findOne({_id: req.params.postid})
    .populate("postedBy" , "_id")
    // .then(posts => res.json(posts))
    .then(post => {
        post.deleteOne().then(result => {
            return res.json({message : "Problem Resolved"})
        }).catch((err) => {
            console.log("error")
        })
    })

 });







module.exports = router;
