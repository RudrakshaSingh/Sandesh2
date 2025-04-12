import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";

import AboutUs from './Pages/AboutUs';
import PrivacyPolicy from './Pages/CompanyPolicy/PrivacyPolicy';
import ContactUs from './Pages/ContactUs';
import CreateCard from './Pages/CreateCard';
import Home from './Pages/Home';
import UserChangePassword from './Pages/User/UserChangePassword';
import UserDelete from './Pages/User/UserDelete';
import UserForgotPassword from './Pages/User/UserForgotPassword';
import UserLogin from './Pages/User/UserLogin';
import UserNewPassword from './Pages/User/UserNewPassword';
import UserProfilePage from './Pages/User/UserProfilePage';
import UserRegister from './Pages/User/UserRegister';
import { checkAuthStatus } from './Redux/Slices/UserAuth';
import PageNotFound from './Pages/Error/PageNotFound';
import AccessDenied from './Pages/Error/AccessDenied';


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
      {/* route pattern for reset password with token parameter */}
      <Route path="/user/reset-password/:resetToken" element={<UserNewPassword/>}/>
      {/*  this route as a fallback for direct access */}
      <Route path="/user/new-password" element={<UserNewPassword/>}/>
      <Route path = "/user/change-password" element = {<UserChangePassword/>}/>
      <Route path = "/user/privacy-policy" element = {<PrivacyPolicy/>}/>
      <Route path = '/create-card' element  = {<CreateCard/>}/>
      <Route path = '/user/profile' element = {<UserProfilePage/>}/>
      <Route path = '/privacy-policy' element = {<PrivacyPolicy/>}/>
      <Route path = '/about-us' element = {<AboutUs/>}/>
      <Route path = '/contact-us' element = {<ContactUs/>}/>
      <Route path = '/user/delete' element = {<UserDelete/>}/>
      <Route path = '*' element = {<PageNotFound/>}/>
      <Route path = '/access-denied' element = {<AccessDenied/>}/>
    </Routes>
  )
}
export default App