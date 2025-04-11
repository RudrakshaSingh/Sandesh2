import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserProfile } from '../../Redux/Slices/UserAuth';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector((state) => state.userAuth);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (error === "Authentication failed") {
      navigate('/user/login');
    }
  }, [error, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Your Profile</h2>

        {loading && (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}

        {error && !loading && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {success && user && !loading && (
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-600 font-medium">Full Name:</span>
              <span className="text-gray-800">
  {user?.fullname?.firstname} {user?.fullname?.lastname}
</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-600 font-medium">Mobile Number:</span>
              <span className="text-gray-800">{user.mobileNumber}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-600 font-medium">Address:</span>
              <span className="text-gray-800">{user.address}</span>
            </div>

            {user.profileImage && (
              <div className="flex flex-col items-center">
                <span className="text-gray-600 font-medium">Profile Image:</span>
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mt-2 object-cover"
                />
              </div>
            )}

            <div className="flex flex-col">
              <span className="text-gray-600 font-medium">Account Created:</span>
              <span className="text-gray-800">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-600 font-medium">Last Updated:</span>
              <span className="text-gray-800">
                {new Date(user.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}

        {!user && !loading && !error && (
          <p className="text-center text-gray-500">No profile data available.</p>
        )}

        <div></div>
        

        {
        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
        >
          Back to Home
        </button> }
      </div>
    </div>
  );
};

export default UserProfilePage;