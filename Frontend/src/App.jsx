import React from 'react'
import { Route, Routes } from "react-router-dom";
import UserLogin from './Pages/User/UserLogin';
import Home from './Pages/Home';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/user/login" element={<UserLogin/>} />
    </Routes>
  )
}

export default App