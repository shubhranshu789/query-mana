import React, { useEffect, useState } from 'react'
import logo from "../img/logo2.jpg"
import './SignUp.css'
import { Link , useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function Moderate() {


  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //functions

  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const postData = () => {

      //checking Email
      if(!emailRegex.test(email)){
          notifyA("Invalid Email")
          return
      }

      //sending data to server 
      fetch("/agentSignup" , {
          method:"post",
          headers: {
              "Content-Type" : "application/json"
          },
          body:JSON.stringify({
              name:name,
              email:email,
              userName:userName,
              password:password,
              phone:phone,
              address:address
          })

          
      }).then(res => res.json())
      .then(data => {
          if(data.error){
              notifyA(data.error)
          }else{
              notifyB(data.message)
              navigate('/adminhome')
          }
          
          console.log(data)})
  }






  return (
    <div className='signUp'>
    <div className="form-container">
        <h1>Create Agent</h1>
        <br />
        
        <img className='signUpLogo' src={logo} alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea unde placeat voluptas aliquid nemo sapiente error asperiores est ullam in alias earum, nihil explicabo modi dicta id eligendi odit tenetur.</p>
        <div>
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
        <input type="submit" id='submit-btn' value="Craete" onClick={() => {postData()}}/>
    </div>

    {/* <div className='form2'>
        Aready have an account ?

        <Link to="/signin">
            <span style={{ color: "blue", cursor: "pointer" }}>User Sign In</span>
        </Link>

        Admin login
        <Link to="/admin">
            <span style={{ color: "blue", cursor: "pointer" }}>Admin Login</span>
        </Link>

        Moderate login
        <Link to="/moderate">
            <span style={{ color: "blue", cursor: "pointer" }}>Moderate Login</span>
        </Link>

    </div> */}
</div>
  )
}

export default Moderate