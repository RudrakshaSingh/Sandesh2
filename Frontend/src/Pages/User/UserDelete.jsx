import { AlertTriangle, ArrowLeft, Key } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteAccount } from '../../Redux/Slices/UserAuth';

const UserDelete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.userAuth);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (error === "Authentication failed") {
      navigate('/user/login');
    }
  }, [error, navigate]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Clear validation error when user types
    if (validationError) {
      setValidationError('');
    }
  };

  const handleConfirmationChange = (e) => {
    setConfirmation(e.target.value);
  };

  const handleForgotPassword = () => {
    navigate('/user/forgot-password');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password is provided
    if (!password.trim()) {
      setValidationError('Password is required to delete your account');
      return;
    }

    // Check if user has typed the confirmation text correctly
    if (confirmation !== 'delete my account') {
      toast.error('Please type "delete my account" exactly to confirm');
      return;
    }

    // Proceed with account deletion
    dispatch(deleteAccount({ password }))
      .unwrap()
      .then(() => {
        // Navigate to home page after successful deletion
        navigate('/');
      })
      .catch((error) => {
        // Error will be handled by the reducer and shown in UI
        if (error === "Authentication failed") {
          navigate('/user/login');
        } else {
          toast.error(error);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-300 to-orange-400 p-6 text-white relative">
            <button
              onClick={() => navigate('/user/profile')}
              className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="mt-8">
              <h1 className="text-2xl font-bold">Delete Account</h1>
              <p className="text-white/90 mt-2">This action cannot be undone</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6 flex items-center gap-3 bg-red-50 text-red-800 p-4 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">Warning: Permanent Action</h3>
                <p className="text-sm text-red-700 mt-1">
                  Deleting your account will remove all your data from our system. This action cannot be reversed.
                </p>
              </div>
            </div>

            {error && error !== "Authentication failed" && (
              <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
                <p className="font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Confirm your password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    <Key className="w-3.5 h-3.5" />
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-600 focus:ring-orange-600 ${
                    validationError ? 'border-red-500 ring-1 ring-red-500' : ''
                  }`}
                  disabled={loading}
                />
                {validationError && (
                  <p className="mt-1 text-sm text-red-600">{validationError}</p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                  Type "delete my account" to confirm
                </label>
                <input
                  type="text"
                  id="confirmation"
                  value={confirmation}
                  onChange={handleConfirmationChange}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-600 focus:ring-orange-600"
                  placeholder="delete my account"
                  disabled={loading}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/user/profile')}
                  className="mr-4 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    loading ||
                    !password ||
                    confirmation !== 'delete my account'
                  }
                >
                  {loading ? (
                    <span className="flex items-center">
                      <span className="mr-2 animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                      Deleting...
                    </span>
                  ) : (
                    'Delete Account'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDelete;