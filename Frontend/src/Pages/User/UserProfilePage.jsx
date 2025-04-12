import { ArrowLeft, CalendarClock, Edit, Mail, MapPin, Phone, Save, Upload, UserCircle2, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { changePassword, getUserProfile, updateUserProfile } from '../../Redux/Slices/UserAuth';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector((state) => state.userAuth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mobileNumber: '',
    address: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [originalFormData, setOriginalFormData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (error === "Authentication failed") {
      navigate('/user/login');
    }
  }, [error, navigate]);

  useEffect(() => {
    if (user) {
      const initialData = {
        firstname: user.fullname?.firstname || '',
        lastname: user.fullname?.lastname || '',
        mobileNumber: user.mobileNumber || '',
        address: user.address || '',
      };
      setFormData(initialData);
      setOriginalFormData(initialData);
      setPreviewImage(user.profileImage || '');
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Clear validation errors when user starts typing
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: null
      });
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // First name validation - must be at least 3 characters if provided
    if (formData.firstname && formData.firstname.trim().length < 3) {
      errors.firstname = "First name must be at least 3 characters long";
    }
    
    // Last name validation - must be at least 3 characters if provided
    if (formData.lastname && formData.lastname.trim().length < 3) {
      errors.lastname = "Last name must be at least 3 characters long";
    }
    
    // Mobile number validation - must be exactly 10 digits if provided
    if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = "Mobile number must be exactly 10 digits";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) {
      toast.error("Please fix the validation errors before saving");
      return;
    }
    
    // Create FormData object to handle partial updates
    const updateData = new FormData();
    
    // Only append fields that have changed
    if (formData.firstname !== originalFormData.firstname) {
      updateData.append('firstname', formData.firstname);
    }
    
    if (formData.lastname !== originalFormData.lastname) {
      updateData.append('lastname', formData.lastname);
    }
    
    if (formData.mobileNumber !== originalFormData.mobileNumber) {
      updateData.append('mobileNumber', formData.mobileNumber);
    }
    
    if (formData.address !== originalFormData.address) {
      updateData.append('address', formData.address);
    }
    
    // Add profile image only if changed
    if (profileImage) {
      updateData.append('profileImage', profileImage);
    }
    
    // Only dispatch update if there are changes
    if ([...updateData.entries()].length > 0) {
      dispatch(updateUserProfile(updateData))
        .unwrap()
        .then(() => {
          setIsEditing(false);
        })
        .catch((error) => {
          // Errors from the API will be handled by the reducer
          // No need to change editing state
        });
    } else {
      // No changes were made
      toast.info("No changes detected");
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white shadow-sm rounded-lg mb-6">
          <div className="bg-gradient-to-r from-orange-300 to-orange-400 p-8 rounded-t-lg text-white relative">
            <button
              onClick={() => navigate('/')}
              className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center mt-10 gap-6">
              <div 
                onClick={handleImageClick} 
                className="relative cursor-pointer"
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className={`w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg ${isEditing ? 'hover:opacity-80' : ''}`}
                  />
                ) : (
                  <div className={`w-28 h-28 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg ${isEditing ? 'hover:opacity-80' : ''}`}>
                    <UserCircle2 className="w-14 h-14" />
                  </div>
                )}
                
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                )}
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {user?.fullname?.firstname} {user?.fullname?.lastname}
                </h1>
                <p className="text-base opacity-90 mt-2">Manage your professional profile</p>
              </div>
            </div>
          </div>

          {/* Profile Actions */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-end gap-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-200"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({...originalFormData});
                      setPreviewImage(user?.profileImage || '');
                      setProfileImage(null);
                      setValidationErrors({});
                    }}
                    className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white shadow-sm rounded-lg p-8">
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
            </div>
          )}

          {error && !loading && error !== "Authentication failed" && (
            <div className="text-center text-red-600 font-medium bg-red-50 p-4 rounded-lg mb-6">
              <p>{error}</p>
              {isEditing && (
                <p className="mt-2 text-sm">
                  You can still continue editing or cancel your changes.
                </p>
              )}
            </div>
          )}

          {user && !loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name <span className="text-xs text-gray-500">(min. 3 characters)</span>
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-600 focus:ring-orange-600 ${
                        validationErrors.firstname ? 'border-red-500 ring-1 ring-red-500' : ''
                      }`}
                      minLength={3}
                    />
                    {validationErrors.firstname && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.firstname}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name <span className="text-xs text-gray-500">(min. 3 characters)</span>
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-600 focus:ring-orange-600 ${
                        validationErrors.lastname ? 'border-red-500 ring-1 ring-red-500' : ''
                      }`}
                      minLength={3}
                    />
                    {validationErrors.lastname && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.lastname}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile Number <span className="text-xs text-gray-500">(10 digits)</span>
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-600 focus:ring-orange-600 ${
                        validationErrors.mobileNumber ? 'border-red-500 ring-1 ring-red-500' : ''
                      }`}
                      maxLength={10}
                      pattern="[0-9]{10}"
                    />
                    {validationErrors.mobileNumber && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.mobileNumber}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="4"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-600 focus:ring-orange-600"
                    ></textarea>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-orange-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-lg font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-orange-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Mobile Number</p>
                      <p className="text-lg font-medium text-gray-900">{user.mobileNumber || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-orange-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-lg font-medium text-gray-900">{user.address || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CalendarClock className="w-6 h-6 text-orange-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Joined On</p>
                      <p className="text-lg font-medium text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CalendarClock className="w-6 h-6 text-orange-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="text-lg font-medium text-gray-900">
                        {new Date(user.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {!user && !loading && !error && (
            <p className="text-center text-gray-600 text-lg">No profile data available.</p>
          )}
        </div>

        {/* Additional Features Section */}
        {user && !isEditing && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
              <p className="text-sm text-gray-500 mt-2">Manage your account security</p>
              <button
                onClick={() => navigate('/user/change-password')}
                className="mt-4 inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-200"
              >
                Change Password
              </button>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
              <p className="text-sm text-gray-500 mt-2">Delete your account permanently</p>
              <button
                onClick={() => navigate('/user/delete')}
                className="mt-4 inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-200"
              >
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;