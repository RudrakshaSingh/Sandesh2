import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, User, Mail, Key, Phone, MapPin, Camera } from "lucide-react";
import Webcam from "react-webcam";

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

  const navigate = useNavigate();

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
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
      {/* Left Section: Registration Form */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 flex items-center bg-gray-200 justify-center">
        <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="mt-2 text-gray-600">Join our platform and get started</p>
          </div>

          <form className="space-y-5">
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
                    className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="First Name"
                  />
                </div>
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
                    className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="Last Name"
                  />
                </div>
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
                  className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Email address"
                />
              </div>
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
                    className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="Password"
                  />
                </div>
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
                    className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
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
                className="w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Account
              </button>
            </div>
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/users/login" className="font-medium text-indigo-600 hover:text-indigo-500">
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