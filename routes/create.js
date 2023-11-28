const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const ADMIN = mongoose.model("ADMIN");1
const AGENT = mongoose.model("AGENT");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys");
const requireLogin = require("../middlewares/requireLogin");
const requireLoginAdmin = require("../middlewares/requireLoginAdmin")
const POST = mongoose.model("POST");
const FEEDB = mongoose.model("FEEDB");



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


 router.get("/allusers", (req, res) => {

    

    USER.find()
    .populate("_id name phone address email userName")
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
 });




 router.delete("/deleteUser/:userid", async(req, res) => {
    const userId = req.params.userid;
    // console.log(req.params.postID)
    USER.findOne({_id: req.params.userid})
    .populate("_id")
    // .then(posts => res.json(posts))
    .then((user) => {
        user.deleteOne().then(result => {

            // try {
            //     // Use the $in operator to delete multiple items by ID
            //     const result = await POST.deleteMany({ postedBy: userId});
            
            //     if (result.deletedCount === 0) {
            //       return res.status(404).json({ error: 'No items found for the provided IDs' });
            //     }
            
            //     res.json({ message: 'Items deleted successfully' });
            //   } catch (error) {
            //     console.error(error);
            //     res.status(500).json({ error: 'Internal Server Error' });
            //   }




            return res.json({message : "User Query Deleted"})
        }) 
        .catch((err) => {
            console.log("error")
        })
    })





 });







router.delete("/multipleDeletePost/:userid" , async(req,res) => {
    const userId = req.params.userid;

    try {
        // Use the $in operator to delete multiple items by ID
        const result = await POST.deleteMany({ postedBy: userId});
        const result1 = await FEEDB.deleteMany({ postedBy: userId});
    
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'No items found for the provided IDs' });
        }
        res.json({ message: 'Posts deleted successfully' });

        if (result1.deletedCount === 0) {
            return res.status(404).json({ error: 'No items found for the provided IDs' });
          }
          res.json({ message: 'Feedbacks deleted successfully' });


      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }


    // return res.json(userId)


    
})


 
 router.get("/allagents", (req, res) => {
    AGENT.find()
    .populate("_id name phone address email userName")
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
 });

 router.delete("/deleteAgent/:agentid", (req, res) => {
    console.log(req.params.postID)
    AGENT.findOne({_id: req.params.agentid})
    .populate("_id")
    // .then(posts => res.json(posts))
    .then(agent => {
        agent.deleteOne().then(result => {
            return res.json({message : "Agent Deleted"})
        }).catch((err) => {
            console.log("error")
        })
    })

 });



 router.post("/createfeedback",requireLogin,(req, res) => {
    const { body } = req.body;
    if (!body) {
        return res.status(422).json({ error: "Please add your Feedback..." });
    } else {
        req.user;
        // res.json("ok")
        const feedback = new FEEDB({
            body,
            postedBy: req.user,
        });
        feedback
            .save()
            .then((result) => {
                return res.json({ feedback: result });
            })
            .catch((err) => console.log(err));
    }
});

router.get("/allfeed", (req, res) => {
    FEEDB.find()
    .populate("postedBy" , "_id name phone address")
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
 });










module.exports = router;
