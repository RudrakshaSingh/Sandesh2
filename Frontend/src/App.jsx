import React from 'react'
import { Route, Routes } from "react-router-dom";

import CreateCard from './Pages/CreateCard';
import Home from './Pages/Home';
import ProfilePage from './Pages/User/ProfilePage';
import UserForgotPassword from './Pages/User/UserForgotPassword';
import UserLogin from './Pages/User/UserLogin';
import UserNewPassword from './Pages/User/UserNewPassword';
import UserPrivacyPolicy from './Pages/User/UserPrivacyPolicy';
import UserRegister from './Pages/User/UserRegister';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/users/login" element={<UserLogin/>} />
      <Route path = "/user/register" element = {<UserRegister/>}/>
      <Route path = "/user/forgot-password" element = {<UserForgotPassword/>}/>
      <Route path = "/user/new-password" element = {<UserNewPassword/>}/>
      <Route path = "/user/privacy-policy" element = {<UserPrivacyPolicy/>}/>
      <Route path = '/create-card' element  = {<CreateCard/>}/>
      <Route path = '/user/profile' element = {<ProfilePage/>}/>
    </Routes>
  )
}

export default App