import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";

import CreateCard from './Pages/CreateCard';
import Home from './Pages/Home';
import UserForgotPassword from './Pages/User/UserForgotPassword';
import UserLogin from './Pages/User/UserLogin';
import UserNewPassword from './Pages/User/UserNewPassword';
import PrivacyPolicy from './Pages/CompanyPolicy/PrivacyPolicy';
import UserProfilePage from './Pages/User/UserProfilePage';
import UserRegister from './Pages/User/UserRegister';
import { checkAuthStatus } from './Redux/Slices/UserAuth';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check authentication status when the app loads
    dispatch(checkAuthStatus());
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/user/login" element={<UserLogin/>} />
      <Route path = "/user/register" element = {<UserRegister/>}/>
      <Route path = "/user/forgot-password" element = {<UserForgotPassword/>}/>
      <Route path = "/user/new-password" element = {<UserNewPassword/>}/>
      <Route path = "/user/privacy-policy" element = {<UserPrivacyPolicy/>}/>
      <Route path = '/create-card' element  = {<CreateCard/>}/>
      <Route path = '/user/profile' element = {<UserProfilePage/>}/>
      <Route path = '/privacy-policy' element = {<PrivacyPolicy/>}/>
    </Routes>
  )
}

export default App