
import React, { createContext , useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ViewQuery from './components/ViewQuery';
import Track from './components/Track';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Admin from './components/Admin';
import AdminHome from './components/AdminHome';
import Profile from './components/Profile';
import Create from './components/Create';
import { LoginContext } from "./context/LoginContext"




import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './components/Modal';



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
