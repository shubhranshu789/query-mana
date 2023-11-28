import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import welcome from "../img/welcome.jpg";
import home from "../img/Home.jpg";
import { Link } from "react-router-dom";
import './Home.css'

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      navigate("./signup");
    }
  }, []);

  return (
    <div className="home">

      {/* card */}
      <div className="card">
        <img src={home} className="image" alt="" />
      </div>


      <div className="buttons">
        <Link to="/profile" >
          <button className="btn1">View All Query</button>
        </Link>
        
        <Link to="/create">
          <button className="btn2">IVR/Self-Service</button>
        </Link>

        <Link to="/feedback">
          <button className="btn3">Feedback</button>
        </Link>

        
      </div>





      {/* card */}
      {/* <div className="card">
        <img src={home} className="logo" alt="" />
        <br />
        
      </div> */}


      {/* <div className="buttons">
        <Link to="/profile" >
          <button className="primaryBtn2">View All Query</button>
        </Link>
        <br />
        <Link to="/create">
          <button className="primaryBtn3"> Create a Query</button>
        </Link>
      </div> */}


    </div>
  );
}
