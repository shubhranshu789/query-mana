import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import welcome from "../img/welcome.jpg";

export default function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    const token  = localStorage.getItem("jwt");

    if(!token){
      navigate('./signup')
    }
  }, []);

  return (
    <div className='home'>
      {/* card */}
      <div className="card">
      <img src={welcome} className="logo" alt=""  style={{width : "1200px"}}/>
      </div>
    </div>
  )
}
