/* eslint-disable no-useless-escape */
import { Camera, Key, Mail, MapPin, Phone, Upload, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { registerUser, resetUserState } from "../../Redux/Slices/UserAuth";

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

// Constants
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function UserRegister() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    profileImage: null,
    previewUrl: "",
    showWebcam: false,
    capturedImage: false,
  });

  const [errors, setErrors] = useState({});
  const [googleLoading, setGoogleLoading] = useState(false);

  // Get Redux state and dispatch
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.userAuth);

  const navigate = useNavigate();

  // Reset user state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetUserState());
    };
  }, [dispatch]);

  // Redirect on successful registration
  useEffect(() => {
    if (success) {
      navigate("/user/login");
    }
  }, [success, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: file,
          previewUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapturePhoto = (getScreenshot) => {
    try {
      const imageSrc = getScreenshot();
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          setFormData((prev) => ({
            ...prev,
            capturedImage: imageSrc,
            previewUrl: imageSrc,
            profileImage: blob,
            showWebcam: false,
          }));
        });
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error for this field when user makes changes
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate firstname
    if (!formData.firstName || formData.firstName.trim().length < 3) {
      newErrors.firstName = "First name is required and must be at least 3 characters long";
    }

    // Validate lastname
    if (!formData.lastName || formData.lastName.trim().length < 3) {
      newErrors.lastName = "Last name is required and must be at least 3 characters long";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please provide a valid email";
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    // Validate password confirmation (frontend only validation)
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare data for API using FormData
    const userData = new FormData(); // Initialize as FormData
    userData.append("firstname", formData.firstName);
    userData.append("lastname", formData.lastName);
    userData.append("email", formData.email);
    userData.append("password", formData.password);
    userData.append("mobileNumber", formData.mobileNumber);
    userData.append("address", formData.address);

    // Add profileImage if it exists
    if (formData.profileImage) {
      userData.append("profileImage", formData.profileImage);
    }

    // Dispatch registerUser action
    dispatch(registerUser(userData));
  };

  // Google Sign-in handler
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Create FormData with Google user data
      const userData = new FormData();
      userData.append("firstname", user.displayName?.split(' ')[0] || '');
      userData.append("lastname", user.displayName?.split(' ').slice(1).join(' ') || '');
      userData.append("email", user.email);
      userData.append("password", `Google-${Math.random().toString(36).slice(2)}`); // Generate a random password

      if (user.photoURL) {
        // Fetch the profile image from Google and append it to FormData
        const response = await fetch(user.photoURL);
        const blob = await response.blob();
        userData.append("profileImage", blob);
      }

      // Optional: You can update form data to show the user what was submitted
      setFormData(prev => ({
        ...prev,
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
        email: user.email,
        previewUrl: user.photoURL || '',
      }));

      // Dispatch the same registerUser action with Google data
      dispatch(registerUser(userData));

    } catch (error) {
      console.error("Error signing in with Google:", error);
      setErrors(prev => ({ ...prev, google: error.message }));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
      {/* Left Section: Registration Form */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 flex items-center bg-gray-200 justify-center">
        <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="mt-2 text-gray-600">Join our platform and get started</p>
            {error && <p className="mt-2 text-red-600">{error}</p>}
          </div>

          {/* Google Sign-up Button */}
          <div className="mt-4 mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              {googleLoading ? "Signing up..." : "Sign up with Google"}
            </button>
            {errors.google && <p className="text-red-500 text-xs mt-1">{errors.google}</p>}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Profile Image Upload */}
            <div className="flex justify-center">
              <label htmlFor="profileImage" className="relative group cursor-pointer">
                <div className={`w-24 h-24 rounded-full overflow-hidden border-2 ${formData.previewUrl ? "border-indigo-400" : "border-gray-300"}`}>
                  {formData.previewUrl ? (
                    <img
                      src={formData.previewUrl}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center bg-gray-50">
                      <User className="w-10 h-10 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                </div>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                className="absolute mt-16 ml-16 p-1.5 bg-indigo-500 rounded-full shadow-md hover:bg-indigo-600 transition-colors"
                onClick={() => setFormData((prev) => ({ ...prev, showWebcam: true }))}
              >
                <Camera className="text-white" size={16} />
              </button>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 pl-10 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                    placeholder="First Name"
                  />
                </div>
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 pl-10 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                    placeholder="Last Name"
                  />
                </div>
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full px-3 py-2 pl-10 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                  placeholder="Email address"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password Fields */}
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 pl-10 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                    placeholder="Password"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 pl-10 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm`}
                    placeholder="Confirm Password"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="mobileNumber"
                    type="text"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="Mobile Number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="Address"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/user/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>


      <div className="hidden lg:flex items-center justify-center p-8  bg-opacity-10">
        {formData.showWebcam ? (
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Take Profile Photo</h3>
            <Webcam
              audio={false}
              height={400}
              screenshotFormat="image/jpeg"
              width={550}
              videoConstraints={videoConstraints}
              className="rounded-lg shadow-md mx-auto"
            >
              {({ getScreenshot }) => (
                <button
                  onClick={() => handleCapturePhoto(getScreenshot)}
                  className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors"
                >
                  Capture Photo
                </button>
              )}
            </Webcam>
          </div>
        ) : (
          <div className="text-center max-w-md p-8">
            <img
              src="https://static.vecteezy.com/system/resources/previews/017/275/893/non_2x/man-holding-a-registration-sheet-in-his-hand-form-illustration-with-man-signing-a-paper-work-document-modern-flat-design-concept-for-web-banners-web-sites-infographics-printed-materials-vector.jpg"
              alt="Registration illustration"
              className="mx-auto mb-6 rounded-lg shadow-lg"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Welcome to Our Platform </h2>
            <p className="text-gray-600">Create an account to access all features and start your journey with us.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserRegister;