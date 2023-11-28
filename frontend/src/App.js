
import React, { createContext , useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ViewQuery from './components/ViewQuery';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Admin from './components/Admin';
import AdminHome from './components/AdminHome';
import Profile from './components/Profile';
import Create from './components/Create';
import Moderate from './components/Moderate';
import ModeratorSignIn from './components/ModeratorSignIn';
import AgentWork from './components/AgentWork';
import About from './components/About';
import ContactUs from './components/ContactUs';
import AllAgents from './components/AllAgents';
import Report11 from './components/Report11';
import Feedback from './components/Feedback';
import AgentAllUsers from './components/AgentAllUsers';
import UserFeedback from './components/UserFeedback';


import { LoginContext } from "./context/LoginContext"




import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './components/Modal';
// import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [userLogin, setUserLogin] = useState(false); 
  const [adminLogin, setadminLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">

        <LoginContext.Provider value ={{setUserLogin,setadminLogin , setModalOpen}} >
          <Navbar login = {userLogin}/>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            {/* <Route path='/query' element={<Query/>}></Route>
        <Route path='/track' element={<Track/>}></Route> */}
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/signin' element={<SignIn />}></Route>
            <Route path='/admin' element={<Admin />}></Route>
            <Route path='/adminhome' element={<AdminHome />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/create' element={<Create />}></Route>
            <Route path='/viewquery' element={<ViewQuery />}></Route>
            <Route path='/moderate' element={<Moderate />}></Route>
            <Route path='/moderatorsignin' element={<ModeratorSignIn />}></Route>
            <Route path='/agentwork' element={<AgentWork />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/contactus' element={<ContactUs />}></Route>
            <Route path='/allagents' element={<AllAgents />}></Route>
            <Route path='/report11' element={<Report11 />}></Route>
            <Route path='/feedback' element={<Feedback />}></Route>
            <Route path='/agentalluser' element={<AgentAllUsers />}></Route>
            <Route path='/userfeedback' element={<UserFeedback />}></Route>
           


          </Routes>
          {/* <Query/>
      <Track/> */}
          <ToastContainer theme='dark' />
            {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContext.Provider>

        {/*  */}
      </div>
    </BrowserRouter>

  );
}

export default App;
