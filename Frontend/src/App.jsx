import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";

import UserProtector from './Components/UserProtector';
import AboutUs from './Pages/AboutUs';
import Cards from './Pages/Cards/Cards';
import Main from './Pages/ChatBot'
import PrivacyPolicy from './Pages/CompanyPolicy/PrivacyPolicy';
import TermsAndConditions from './Pages/CompanyPolicy/TermsAndConditions';
import ContactUs from './Pages/ContactUs';
import CreateCard from './Pages/CreateCard';
import AccessDenied from './Pages/Error/AccessDenied';
import PageNotFound from './Pages/Error/PageNotFound';
import Home from './Pages/Home';
import UserChangePassword from './Pages/User/UserChangePassword';
import UserDelete from './Pages/User/UserDelete';
import UserForgotPassword from './Pages/User/UserForgotPassword';
import UserLogin from './Pages/User/UserLogin';
import UserNewPassword from './Pages/User/UserNewPassword';
import UserProfilePage from './Pages/User/UserProfilePage';
import UserRegister from './Pages/User/UserRegister';
import { getUserProfile } from './Redux/Slices/UserAuth';
import SendInvitation from './Pages/SendInvitation';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken || refreshToken) {
          dispatch(getUserProfile());
      }
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
      <Route path = "/user/change-password" element = {<UserProtector><UserChangePassword/></UserProtector>}/>
      <Route path = '/create-card' element  = {<UserProtector><CreateCard/></UserProtector>}/>
      <Route path = '/user/profile' element = {<UserProtector><UserProfilePage/></UserProtector>}/>
      <Route path = '/privacy-policy' element = {<PrivacyPolicy/>}/>
      <Route path = '/terms-and-conditions' element = {<TermsAndConditions/>}/>
      <Route path = '/about-us' element = {<AboutUs/>}/>
      <Route path = '/contact-us' element = {<ContactUs/>}/>
      <Route path = '/user/delete' element = {<UserProtector><UserDelete/></UserProtector>}/>
      <Route path="/cards" element={<Cards/>}/>
      <Route path="/templates/:type" element={<Cards/>}/>
      <Route path="/access-denied" element={<AccessDenied/>}/>
      <Route path = "/send-invitation" element = {<SendInvitation/>}/>
      <Route path="*" element={<PageNotFound/>}/>

    </Routes>
  )
}
export default App