import React from 'react'
import { Route, Routes } from "react-router-dom";
import UserLogin from './Pages/User/UserLogin';
import Home from './Pages/Home';
import UserRegister from './Pages/User/UserRegister';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/users/login" element={<UserLogin/>} />
      <Route path = "/user/register" element = {<UserRegister/>}/>
    </Routes>
  )
}

export default App