import React, { useContext } from "react";
import logo from "../img/logo2.jpg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function Navbar({ login }) {

    const { setModalOpen } = useContext(LoginContext)

    const loginStatus = () => {
        const token = localStorage.getItem("jwt");
        if (login || token) {
            return [
                <>
                    


                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    <Link to="/contactus">
                        <li>Contact Us</li>
                    </Link>
                    <Link to="">
                        <button className="primaryBtn" onClick={() => {
                            setModalOpen(true)
                        }}>Log Out</button>
                    </Link>
                </>,
            ];
        } else {
            return [
                <>
                    <Link to="/signup">
                        <li className="primaryBtn2">signup</li>
                    </Link>
                    <Link to="/signin">
                        <li className="primaryBtn3">signin</li>
                    </Link>
                </>,
            ];
        }
    };


    return (
        <div className="navbar">

            <img src={logo} className="logo1" alt=""  style={{borderRadius:"50%"}}/>
            <ul className="nav-menu">
                {loginStatus()}

                {/* <Link to="/Query">
            <li>Query</li>
            </Link>
            <Link to="/Track">
            <li>Track</li>
            </Link> */}

                {/* Logout ke lie h  */}
                {/* <Link to="/Logout">
            <li>Logout</li>
            </Link> */}

                {/* <li>Track</li>
         */}
            </ul>
        </div>
    );
}
