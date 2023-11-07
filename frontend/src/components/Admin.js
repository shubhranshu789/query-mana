import React, { useState, useContext } from 'react'
import './SignIn.css'
import logo from "../img/logo2.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { LoginContext } from '../context/LoginContext';


function Admin() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const postData = () => {
        //sending data to server 
        fetch("/adminSignin" , {
            method:"post",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({      
                userName:userName,  
                password:password      
            })


        }).then(res => res.json())
        .then(data => {
            if(data.error){
                notifyA(data.error)
            }else{
                notifyB(data.message)
                console.log(data)
                localStorage.setItem("jwt" , data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                navigate('/adminhome')
            }

            console.log(data)})
    }



    // const postData = () => {
    //     //sending data to server 
    //     fetch("http://localhost:5000/adminSignup", {
    //         method: "post",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             name:name,
    //             email:email,
    //             userName:userName,
    //             password:password,
    //             phone:phone,
    //             address:address
    //         })


    //     }).then(res => res.json())
    //         .then(data => {
    //             if (data.error) {
    //                 notifyA(data.error)
    //             } else {
    //                 notifyB(data.message)
    //                 navigate('/signin')
    //             }

    //             console.log(data)
    //         })
    // }



    return (
        <div className='signIn'>
            <div className="loginForm">
                <h1>Admin Login</h1>
                <br />
                <br />
                <br />
                <img className='signUpLogo' src={logo} alt="" />
                <div>
                <input type="userName" name="userName" id="userName" placeholder='userName' 
                value={userName} onChange={(e) => {setuserName(e.target.value)}}/>
            </div>
            <div>
                <input type="password" name="pass" id="pass" placeholder='Password' 
                value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <input type="submit"  value="Sign In" id='login-btn' onClick={() => {postData()}}/>
            </div>
            <div className="loginForm2">
                Dont't have an account ?

                <Link to="/signUp">
                    <span style={{ color: "blue", cursor: "pointer" }}>User Sign Up</span>

                </Link>
            </div>








            <div className="test">
            {/* <div>
                    <input type="email" name="email" id="email" placeholder='Email' 
                    value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div>
                    <input type="text" name="name" id="name" placeholder='Name' 
                    value={name} onChange={(e) => {setName(e.target.value)}}/>
                </div>
                <div>
                    <input type="text" name="userName" id="userName" placeholder='userName'
                    value={userName} onChange={(e) => {setuserName(e.target.value)}} />
                </div>
                <div>
                    <input type="text" name="address" id="address" placeholder='Address' 
                    value={address} onChange={(e) => {setAddress(e.target.value)}}
                    />
                </div>
                <div>
                    <input type="number" name="phone" id="phone" placeholder='Phone' 
                    value={phone} onChange={(e) => {setPhone(e.target.value)}}/>
                </div>
                <div>
                    <input type="password" name="pass" id="pass" placeholder='password' 
                    value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <input type="submit" value="Sign Up" id='login-btn' onClick={() => { postData() }} /> */}
            </div>


            
        </div>

    )
}

export default Admin