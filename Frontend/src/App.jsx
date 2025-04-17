import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";

import UserProtector from './Components/UserProtector';
import AboutUs from './Pages/AboutUs';
import AddContact from './Pages/AddContact';
import Cards from './Pages/Cards/Cards';
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


function App() {
  const dispatch = useDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        
        if (accessToken || refreshToken) {
          await dispatch(getUserProfile()).unwrap();
        }
      } catch (error) {
        console.error("Authentication error:", error);
        // Handle token refresh failure if needed
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, [dispatch]);

  // Show loading or nothing while checking authentication
  if (isCheckingAuth) {
    return <div>Loading...</div>; // Or return null, or a proper loading component
  }
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
      <Route path = "user/add-contacts" element = {<UserProtector><AddContact/></UserProtector>}/>
      <Route path="*" element={<PageNotFound/>}/>

    </Routes>
  )
}
export default App