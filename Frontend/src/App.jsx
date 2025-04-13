import React from 'react'
import { Route, Routes } from "react-router-dom";

import UserProtector from './Components/UserProtector';
import AboutUs from './Pages/AboutUs';
import WeddingCardGallery from './Pages/Cards/WeddingCards';
import PrivacyPolicy from './Pages/CompanyPolicy/PrivacyPolicy';
import TermsAndConditions from './Pages/CompanyPolicy/TermsAndConditions';
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


function App() {
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
      <Route path = '/templates/wedding-card' element = {<WeddingCardGallery/>}/>
      <Route path = '/user/delete' element = {<UserProtector><UserDelete/></UserProtector>}/>


    </Routes>
  )
}
export default App