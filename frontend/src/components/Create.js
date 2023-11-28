import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import './Create.css'

import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';




export default function Create() {

  const [body, setBody] = useState("");

  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)
  const [isOpen, setIsOpen] = useState(false);


  const navigate = useNavigate();

  function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
  }


  const show = () => {
    console.log(body)
  }


  const postDetails = () => {
    console.log(body)



    fetch("/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        body
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        } else {
          notifyB("Query Registered")
          navigate("/")
        }
      })
      .catch(err => console.log(err))
  }



  return (
    <div className='create'>

      <h3>Create new Query</h3>

      <h4><b>Query Resistered By :</b> {JSON.parse(localStorage.getItem("user")).name}</h4>
      <img src="data:image/png;base64,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" alt="" />






      <textarea type="text" cols="30" rows="10" placeholder='Query'
        value={body} onChange={(e) => { 
          setBody(e.target.value) }}
          ></textarea>
      <br />


      {/* ------------------------------------------------------------------------- */}

      <div>
        <h4>Common Problems</h4>

        <select name="query" value={body} onChange={(e) => { setBody(e.target.value) }} style={{width : "200px"}} className='common'>
          <option value={"Internet Issue"} >Internet Issue</option>
          <option value={"Calling Issue"} >Calling Issue</option>
          <option value={"Braodband Issue"} >Braodband Issue</option>
          <option value={"Other"} >Other</option>
        </select>

      </div>



      <br />
     
      
      <button className='primaryBtn4' id='post-btn' onClick={() => { postDetails() }}>Request</button>
      {/* <button onClick={() => { show() }}>show</button> */}

    </div>



  )
}
