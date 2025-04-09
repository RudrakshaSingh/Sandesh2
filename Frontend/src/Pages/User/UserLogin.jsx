import React, { useState, useEffect } from 'react';
import { Mail, KeyRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetUserState } from '../../Redux/Slices/UserAuth';

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

  // Navigate on successful login and reset state on unmount (like UserRegister)
  useEffect(() => {
    if (success) {
      navigate('/'); // Navigate to home on successful login
    }
  }, [success, navigate]);

  // Reset state when component unmounts (optional, like UserRegister)
  useEffect(() => {
    return () => {
      dispatch(resetUserState());
    };
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <KeyRound className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-right text-sm text-blue-500 hover:underline cursor-pointer">
            Forgot your password?
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl text-white transition-all duration-200 ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{' '}
          <Link to="/users/register" className="text-blue-600 font-medium cursor-pointer hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;