const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const ADMIN = mongoose.model("ADMIN");
const AGENT = mongoose.model("AGENT");
// const FEEDBACK = mongoose.model("FEEDBACK");
// const bcrypt = require('bcrypt');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")
const {Jwt_secret} = require("../keys");
const requireLogin = require("../middlewares/requireLogin");



var http = require('http');
const ipa = '';

http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
  resp.on('data', function(ip) {
    console.log("My public IP address is: " + ip);
  });
});





// for creating Users

router.post("/signup1" , (req,res)=>{
    // res.json("data posted successfully")
    const {name , userName , email,password , address , phone} = req.body;

    const ip = req.headers['cf-connecting-ip'] ||
                req.headers['x-real-ip'] ||
                req.headers['x-forwarded-for'] ||
                req.socket.remoteAddress || '' ;


    if(!name || !email || !userName ||!password ||!address ||!phone ){
        return res.status(422).json({error : "Please add all the fileds"})
    }

    USER.findOne({$or : [{email : email} , {userName : userName}]}).then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error : "user already exist with that email or userName"})
        }

        bcryptjs.hash(password , 12).then((hashedPassword) => {
            const user = new USER ({
                name , 
                userName , 
                email,    
                address , 
                phone,
                password:hashedPassword, //hiding password,
                ip
            })
        
            user.save()
            .then(user => {res.json({message : "Data Saved"})})
            .catch(err => {console.log(err)})
        })
        
    })

    
})



router.post("/signin" , (req , res) => {
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(422).json({error: "please add all the fields"})
    }

    USER.findOne({email:email}).then((savedUser) => {
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email"})
        }
        bcryptjs.compare(password , savedUser.password).then((match) => {
            if(match){
                // return res.status(200).json({message :"Signed In Successufully" })
                const token = jwt.sign({_id:savedUser.id} , Jwt_secret)
                const {_id ,name , email , userName , phone , address} = savedUser
                res.json({token , user:{_id ,name , email , userName , phone , address}})
                console.log({token , user:{_id ,name , email , userName , phone , address}})
            }else{
                return res.status(422).json({error :"Invalid password" })
            }
        })
        .catch(err => console.log(err))
        // console.log(savedUser)
    })
})




// for creating Admins

router.post("/adminSignup" , (req,res)=>{
    // res.json("data posted successfully")
    const {name , userName , email,password , address , phone} = req.body;

    if( !userName ||!password ){
        return res.status(422).json({error : "Please add all the fileds"})
    }

    ADMIN.findOne({userName : userName}).then((savedAdmin) => {
        if(savedAdmin){
            return res.status(422).json({error : "user already exist with that email or userName"})
        }

        bcryptjs.hash(password , 12).then((hashedPassword) => {
            const admin = new ADMIN ({
                name , 
                userName , 
                email,    
                address , 
                phone,
                password:hashedPassword //hiding password
            })
        
            admin.save()
            .then(admin => {res.json({message : "Data Saved"})})
            .catch(err => {console.log(err)})
        })
        
    })

    
})






router.post("/adminSignin" , (req , res) => {
    const {userName , password} = req.body;

    if(!userName || !password){
        return res.status(422).json({error: "please add all the fields"})
    }

    ADMIN.findOne({userName:userName}).then((savedUser) => {
        if(!savedUser){
            return res.status(422).json({error:"Invalid UserName"})
        }
        bcryptjs.compare(password , savedUser.password).then((match) => {
            if(match){
                const token = jwt.sign({_id:savedUser.id} , Jwt_secret)
                const {_id ,name , email , userName , phone , address} = savedUser
                res.json({token , user:{_id ,name , email , userName , phone , address}})
                console.log({token , user:{_id ,name , email , userName , phone , address}})
            }else{
                return res.status(422).json({error :"Invalid password" })
            }
        })
        .catch(err => console.log(err))
        // console.log(savedUser)
    })
})








router.post("/agentSignup" , (req,res)=>{
    // res.json("data posted successfully")
    const {name , userName , email,password , address , phone} = req.body;

    if( !name || !email || !userName ||!password ||!address ||!phone ){
        return res.status(422).json({error : "Please add all the fileds"})
    }

    AGENT.findOne({$or : [{email : email} , {userName : userName}]}).then((savedAgent) => {
        if(savedAgent){
            return res.status(422).json({error : "user already exist with that email or userName"})
        }

        bcryptjs.hash(password , 12).then((hashedPassword) => {
            const agent = new AGENT ({
                name , 
                userName , 
                email,    
                address , 
                phone,
                password:hashedPassword //hiding password
            })
        
            agent.save()
            .then(agent => {res.json({message : "Data Saved"})})
            .catch(err => {console.log(err)})
        })
        
    }) 
})


router.post("/agentsignin" , (req , res) => {
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(422).json({error: "please add all the fields"})
    }

    AGENT.findOne({email:email}).then((savedUser) => {
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email"})
        }
        bcryptjs.compare(password , savedUser.password).then((match) => {
            if(match){
                // return res.status(200).json({message :"Signed In Successufully" })
                const token = jwt.sign({_id:savedUser.id} , Jwt_secret)
                const {_id ,name , email , userName , phone , address} = savedUser
                res.json({token , user:{_id ,name , email , userName , phone , address}})
                console.log({token , user:{_id ,name , email , userName , phone , address}})
            }else{
                return res.status(422).json({error :"Invalid password" })
            }
        })
        .catch(err => console.log(err))
        // console.log(savedUser)
    })
})





module.exports = router;




