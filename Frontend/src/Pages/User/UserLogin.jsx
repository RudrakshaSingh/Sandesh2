import { KeyRound, Mail } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from '../../Redux/Slices/UserAuth';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error, user } = useSelector((state) => state.userAuth);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(loginUser(userData));
  };

  // Navigate on successful login and reset state on unmount
  useEffect(() => {
    if (success) {
      navigate('/'); // Navigate to home on successful login
    }
  }, [success, navigate]);

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

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-amber-600" size={18} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <KeyRound className="absolute left-3 top-3.5 text-amber-600" size={18} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              />
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