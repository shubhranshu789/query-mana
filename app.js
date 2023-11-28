// const http = require('http');

// const server = http.createServer((req , res) =>{
//     console.log("serve crated");
//     res.end("working ");
// });


// server.listen(5000 , "localhost" , () => {
//     console.log("Server is running on 5000")
// })


const express = require("express");
const app = express();
const PORT = process.env.port || 5000;
// const data = require('./data.js')
const cors = require("cors")
const path = require("path")
app.use(cors())

require('./models/model')
require('./models/admin')
require('./models/post')
require('./models/moderator')
require('./models/feedback1')


app.use(express.json())

app.use(require("./routes/auth"))
app.use(require("./routes/create"))
app.use(require("./routes/admin"))



app.use(express.static(path.join(__dirname , "./frontend/build")))
app.get("*" , (req,res)=> {
    res.sendFile(
        path.join(__dirname , "./frontend/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})



app.listen(PORT , () => {
    console.log("Server is running on " + PORT)

})




const mongoose = require("mongoose");
const {mongoUrl} = require("./keys");

mongoose.connect(mongoUrl);

mongoose.connection.on("connected" , () => {
    console.log("Connected to MongoDB");
})



mongoose.connection.on("error" , () => {
    console.log("Not connected to mongoDB");
})












// app.get('/' , (req , res) => {
//     // console.log("Hello")
//     res.json("Hello")
// })
// // app.get('/about' , (req , res) => {
// //     res.json("hello Wrold Abot")
// // })

