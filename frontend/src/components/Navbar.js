import React,{useContext} from "react";
import logo from "../img/logo2.jpg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function Navbar({login}) {

    const {setModalOpen} = useContext(LoginContext)

    const loginStatus = () => {
        const token = localStorage.getItem("jwt");
        if (login || token) {
            return [
                <>
                    <Link to="/profile">
                        <li>Query</li>
                    </Link>
                    <Link to="/create">
                        <li>Create</li>
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
                        <li>signup</li>
                    </Link>
                    <Link to="/signin">
                        <li>signin</li>
                    </Link>
                </>,
            ];
        }
    };
    

    return (
        <div className="navbar">
            
            <img src={logo} className="logo" alt="" style={{width:"100px"}}/>
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
