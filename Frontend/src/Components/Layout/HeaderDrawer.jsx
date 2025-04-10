import React, { useState } from 'react';
import { Menu, X, ChevronDown, User, LogOut, Mail, CircleUserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/Slices/UserAuth';

const HeaderDrawer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Get auth state from Redux
  const { user, success } = useSelector((state) => state.userAuth);
  const isAuthenticated = success && user;
  console.log('user', user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-amber-600 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold">Sandesh</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <Link to="/" className="text-white hover:text-amber-100 py-2 transition duration-150">
                  Home
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-white hover:text-amber-100 py-2 flex items-center transition duration-150"
                >
                  Templates
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link to="/templates/wedding" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">
                      Wedding
                    </Link>
                    <Link to="/templates/festivals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">
                      Festivals
                    </Link>
                    <Link to="/templates/corporate" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">
                      Corporate
                    </Link>
                  </div>
                )}
              </li>
              <li>
                <Link to="/create-card" className="text-white hover:text-amber-100 py-2 transition duration-150">
                  Create
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-amber-100 py-2 transition duration-150">
                  About
                </Link>
              </li>
            </ul>
          </nav>

          {/* Authentication Buttons - Conditional Rendering */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  onMouseEnter={() => setIsProfileDropdownOpen(true)}

                  className="flex items-center justify-center text-white hover:text-amber-100 transition duration-150"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center mr-2">
                        <img src={user.profileImage} className="w-full h-full rounded-full"  alt="" srcset="" />
                  </div>
                  <span className="hidden lg:inline">{user?.fullname?.firstname.toUpperCase() || 'My Account'}</span>
                  <ChevronDown className="ml-1 h-5 w-5 font-bold" />
                </button>

                {isProfileDropdownOpen && (
      <div
    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
    onMouseLeave={() => setIsProfileDropdownOpen(false)}

  >
    <Link to="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 flex items-center">
      <CircleUserRound className="h-4 w-4 mr-2 text-amber-600" />
      My Profile
    </Link>
    <Link to="/my-invitations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 flex items-center">
      <Mail className="h-4 w-4 mr-2 text-amber-600" />
      My Invitations
    </Link>
    <button
      onClick={handleLogout}
      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 flex items-center"
    >
      <LogOut className="h-4 w-4 mr-2 text-amber-600" />
      Logout
    </button>
  </div>
)}
              </div>
            ) : (
              <>
                <Link to="/users/login" className="text-white hover:text-amber-100 text-sm">
                  Log in
                </Link>
                <Link
                  to="/user/register"
                  className="bg-white text-amber-600 px-4 py-2 rounded text-sm font-medium hover:bg-amber-50 transition duration-150"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-amber-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-amber-700">
            <Link to="/" className="block px-3 py-2 text-white hover:bg-amber-600 rounded-md">
              Home
            </Link>
            <button
              onClick={toggleDropdown}
              className="w-full text-left px-3 py-2 text-white hover:bg-amber-600 rounded-md flex items-center justify-between"
            >
              Templates
              <ChevronDown className="h-4 w-4" />
            </button>
            {isDropdownOpen && (
              <div className="pl-4 space-y-1">
                <Link to="/templates/wedding" className="block px-3 py-2 text-amber-100 hover:bg-amber-600 rounded-md text-sm">
                  Wedding
                </Link>
                <Link to="/templates/festivals" className="block px-3 py-2 text-amber-100 hover:bg-amber-600 rounded-md text-sm">
                  Festivals
                </Link>
                <Link to="/templates/corporate" className="block px-3 py-2 text-amber-100 hover:bg-amber-600 rounded-md text-sm">
                  Corporate
                </Link>
              </div>
            )}
            <Link to="/create-card" className="block px-3 py-2 text-white hover:bg-amber-600 rounded-md">
              Create
            </Link>
            <Link to="/about" className="block px-3 py-2 text-white hover:bg-amber-600 rounded-md">
              About
            </Link>

            {/* Mobile Authentication */}
            <div className="pt-4 pb-3 border-t border-amber-600">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center mr-2">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name || 'User'}</p>
                      <p className="text-amber-200 text-xs">{user.email || ''}</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link to="/user/profile" className="block px-3 py-2 text-white hover:bg-amber-600 rounded-md flex items-center">
                      <CircleUserRound className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                    <Link to="/my-invitations" className="block px-3 py-2 text-white hover:bg-amber-600 rounded-md flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      My Invitations
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-3 py-2 text-white hover:bg-amber-600 rounded-md flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/users/login" className="block px-3 py-2 text-white hover:bg-amber-600 rounded-md">
                    Log in
                  </Link>
                  <Link to="/user/register" className="block px-3 py-2 text-white bg-amber-600 hover:bg-amber-500 rounded-md mt-1">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderDrawer;