import React from 'react'
import { Route, Routes } from "react-router-dom";
import UserLogin from './Pages/User/UserLogin';
import Home from './Pages/Home';
import UserRegister from './Pages/User/UserRegister';
import UserForgotPassword from './Pages/User/UserForgotPassword';
import UserNewPassword from './Pages/User/UserNewPassword';
import UserPrivacyPolicy from './Pages/User/UserPrivacyPolicy';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/user/login" element={<UserLogin/>} />
      <Route path = "/user/register" element = {<UserRegister/>}/>
      <Route path = "/user/forgot-password" element = {<UserForgotPassword/>}/>
      <Route path = "/user/new-password" element = {<UserNewPassword/>}/>
      <Route path = "/user/privacy-policy" element = {<UserPrivacyPolicy/>}/>
    </Routes>
  )
}

export default App