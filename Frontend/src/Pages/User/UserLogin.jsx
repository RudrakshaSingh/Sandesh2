/* eslint-disable no-useless-escape */
import { KeyRound, Mail } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { loginUser, resetUserState } from '../../Redux/Slices/UserAuth';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function UserLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [googleLoading, setGoogleLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.userAuth);

  // Reset user state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetUserState());
    };
  }, [dispatch]);

  // Navigate on successful login
  useEffect(() => {
    if (success) {
      navigate('/'); // Navigate to home on successful login
    }
  }, [success, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error for this field when user makes changes
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email';
    }

    // Validate password
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create FormData object to match the registration component approach
    const userData = new FormData();
    userData.append("email", formData.email);
    userData.append("password", formData.password);

    dispatch(loginUser(userData));
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Create FormData with Google user data - matching the approach in registration
      const userData = new FormData();
      userData.append("email", user.email);
      userData.append("password", `Google-${Math.random().toString(36).slice(2)}`); // Same password generation as in registration

      // If your backend needs to know this is a Google login:
      userData.append("isGoogleLogin", "true");

      // Update form data to show what was submitted (optional)
      setFormData(prev => ({
        ...prev,
        email: user.email,
      }));

      // Dispatch login action
      dispatch(loginUser(userData));
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setErrors((prev) => ({ ...prev, google: error.message }));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-amber-50 to-amber-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-amber-100 rounded-full opacity-50"></div>

        <div className="relative z-10">
          {/* Logo or brand element */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-amber-600">Sandesh</h1>
            <p className="text-gray-500 text-sm mt-1">Access your digital invitation dashboard</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-200">
              <p className="text-center">{error}</p>
            </div>
          )}

          {/* Google Sign-In Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              {googleLoading ? 'Signing in...' : 'Sign in with Google'}
            </button>
            {errors.google && <p className="text-red-500 text-xs mt-1">{errors.google}</p>}
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-amber-600" size={18} />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 border ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3.5 text-amber-600" size={18} />
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 border ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex justify-end">
              <Link
                to="/user/forgot-password"
                className="text-sm text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-200 ${
                loading
                  ? 'bg-amber-400 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-700 shadow-md hover:shadow-lg'
              }`}
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm mt-8 text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/user/register"
              className="text-amber-600 font-medium cursor-pointer hover:text-amber-700 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;