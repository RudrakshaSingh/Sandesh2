import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfile,updateUserProfile,changePassword } from '../../Redux/Slices/UserAuth';
import { ArrowLeft, Mail, Phone, MapPin, UserCircle2, CalendarClock, Edit, Save, X } from 'lucide-react';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector((state) => state.userAuth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobileNumber: '',
    address: '',
  });

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
      setFormData({
        firstname: user.fullname?.firstname || '',
        lastname: user.fullname?.lastname || '',
        email: user.email || '',
        mobileNumber: user.mobileNumber || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({
      fullname: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      address: formData.address,
    }));
    setIsEditing(false);
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
            <div className="flex items-center mt-10  gap-6">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg">
                  <UserCircle2 className="w-14 h-14" />
                </div>
              )}
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
                  className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
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
                    onClick={() => setIsEditing(false)}
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
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && !loading && (
            <p className="text-center text-red-600 font-medium bg-red-50 p-4 rounded-lg">{error}</p>
          )}

          {success && user && !loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="4"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
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
        {success && user && !isEditing && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
              <p className="text-sm text-gray-500 mt-2">Manage your account security</p>
              <button
                onClick={() => navigate('/user/change-password')}
                className="mt-4 inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Change Password
              </button>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
              <p className="text-sm text-gray-500 mt-2">Delete your account permanently</p>
              <button
                onClick={() => navigate('/user/delete-account')}
                className="mt-4 inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
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