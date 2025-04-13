import { ChevronDown, CircleUserRound, LogOut, Mail, Menu, User, X, Calendar, Gift, Briefcase, Flag } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logoutUser } from '../../Redux/Slices/UserAuth';

const HeaderDrawer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

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

  const handleCategoryHover = (category) => {
    setActiveCategory(category);
  };

  const templateCategories = [
    {
      id: 'events',
      name: 'Events & Celebrations',
      icon: <Calendar className="h-4 w-4 mr-2" />,
      subcategories: [
        { name: 'Wedding Invitations', path: '/templates/wedding-card' },
        { name: 'Engagement Announcements', path: '/templates/engagement' },
        { name: 'Birthday Invites', path: '/templates/birthday' },
        { name: 'Baby Shower / Naming Ceremony', path: '/templates/baby-shower' },
        { name: 'Anniversary Celebrations', path: '/templates/anniversary' },
        { name: 'Housewarming Invites', path: '/templates/housewarming' },
        { name: 'Retirement Party Invites', path: '/templates/retirement' },
        { name: 'Graduation Celebrations', path: '/templates/graduation' },
      ]
    },
    {
      id: 'festivals',
      name: 'Festivals',
      icon: <Gift className="h-4 w-4 mr-2" />,
      subcategories: [
        { name: 'Diwali Greetings', path: '/templates/diwali' },
        { name: 'Eid Mubarak Cards', path: '/templates/eid' },
        { name: 'Holi Wishes', path: '/templates/holi' },
        { name: 'Christmas Cards', path: '/templates/christmas' },
        { name: 'Raksha Bandhan / Bhai Dooj', path: '/templates/raksha-bandhan' },
        { name: 'Navratri / Durga Puja', path: '/templates/navratri' },
        { name: 'Pongal / Makar Sankranti', path: '/templates/pongal' },
        { name: 'Lohri / Baisakhi / Onam', path: '/templates/regional-festivals' },
      ]
    },
    {
      id: 'personal',
      name: 'Personal & Professional',
      icon: <Briefcase className="h-4 w-4 mr-2" />,
      subcategories: [
        { name: 'Thank You Cards', path: '/templates/thank-you' },
        { name: 'Get Well Soon', path: '/templates/get-well' },
        { name: 'Sorry / Apology Cards', path: '/templates/apology' },
        { name: 'Farewell Notes', path: '/templates/farewell' },
        { name: 'New Job / Promotion Cards', path: '/templates/promotion' },
        { name: 'Love Notes / Proposal Cards', path: '/templates/love' },
        { name: 'Condolences / RIP Cards', path: '/templates/condolences' },
        { name: 'Professional Greetings', path: '/templates/professional' },
      ]
    },
    {
      id: 'special',
      name: 'Special Days',
      icon: <Flag className="h-4 w-4 mr-2" />,
      subcategories: [
        { name: 'Valentine\'s Day', path: '/templates/valentines' },
        { name: 'Mother\'s Day / Father\'s Day', path: '/templates/parents-day' },
        { name: 'Teacher\'s Day', path: '/templates/teachers-day' },
        { name: 'Children\'s Day', path: '/templates/childrens-day' },
        { name: 'Independence / Republic Day', path: '/templates/national-days' },
        { name: 'Women\'s Day', path: '/templates/womens-day' },
        { name: 'New Year Greetings', path: '/templates/new-year' },
      ]
    }
  ];

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
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  className="text-white hover:text-amber-100 py-2 flex items-center transition duration-150"
                >
                  Templates
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 w-max bg-white rounded-md shadow-lg py-1 z-20 flex"
                    onMouseLeave={() => {
                      setIsDropdownOpen(false);
                      setActiveCategory(null);
                    }}
                  >
                    {/* Categories */}
                    <div className="w-64 bg-gray-50 border-r border-gray-200">
                      {templateCategories.map((category) => (
                        <button
                          key={category.id}
                          className={`block w-full text-left px-4 py-3 text-sm ${
                            activeCategory === category.id
                              ? 'bg-amber-100 text-amber-800'
                              : 'text-gray-700 hover:bg-amber-50'
                          } flex items-center`}
                          onMouseEnter={() => handleCategoryHover(category.id)}
                        >
                          {category.icon}
                          {category.name}
                        </button>
                      ))}
                    </div>

                    {/* Subcategories */}
                    {activeCategory && (
                      <div className="w-64 py-2">
                        <h3 className="px-4 py-2 text-sm font-medium text-amber-800 border-b border-gray-200">
                          {templateCategories.find(cat => cat.id === activeCategory).name}
                        </h3>
                        <div className="grid grid-cols-1 gap-1 pt-2">
                          {templateCategories
                            .find(cat => cat.id === activeCategory)
                            .subcategories.map((subcategory, index) => (
                              <Link
                                key={index}
                                to={subcategory.path}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                              >
                                {subcategory.name}
                              </Link>
                            ))
                          }
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
              <li>
                <Link to="/create-card" className="text-white hover:text-amber-100 py-2 transition duration-150">
                  Create
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-white hover:text-amber-100 py-2 transition duration-150">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-white hover:text-amber-100 py-2 transition duration-150">
                  Contact
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
                    {user.profileImage ? (
                      <img src={user.profileImage} className="w-full h-full rounded-full" alt="Profile" />
                    ) : (
                      <User className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span className="hidden lg:inline">{user?.fullname?.firstname?.toUpperCase() || 'My Account'}</span>
                  <ChevronDown className="ml-1 h-5 w-5 font-bold" />
                </button>

                {isProfileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                    onMouseLeave={() => setIsProfileDropdownOpen(false)}
                  >
                    <Link to="/user/profile" className="px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 flex items-center">
                      <CircleUserRound className="h-4 w-4 mr-2 text-amber-600" />
                      My Profile
                    </Link>
                    <Link to="/my-invitations" className="px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-amber-600" />
                      My Invitations
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2 text-amber-600" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/user/login" className="text-white hover:text-amber-100 text-sm">
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

            {/* Mobile Templates Dropdown */}
            <div className="space-y-1">
              <button
                onClick={toggleDropdown}
                className="w-full text-left px-3 py-2 text-white hover:bg-amber-600 rounded-md flex items-center justify-between"
              >
                Templates
                <ChevronDown className={`h-4 w-4 transform ${isDropdownOpen ? 'rotate-180' : ''} transition-transform duration-200`} />
              </button>

              {isDropdownOpen && (
                <div className="pl-3 space-y-2">
                  {templateCategories.map((category) => (
                    <div key={category.id} className="space-y-1">
                      <button
                        onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                        className="w-full text-left px-3 py-2 text-amber-100 hover:bg-amber-600 rounded-md text-sm flex items-center justify-between"
                      >
                        <span className="flex items-center">
                          {category.icon}
                          {category.name}
                        </span>
                        <ChevronDown className={`h-3 w-3 transform ${activeCategory === category.id ? 'rotate-180' : ''} transition-transform duration-200`} />
                      </button>

                      {activeCategory === category.id && (
                        <div className="pl-4 space-y-1">
                          {category.subcategories.map((subcategory, index) => (
                            <Link
                              key={index}
                              to={subcategory.path}
                              className="block px-3 py-1.5 text-amber-200 hover:bg-amber-600 hover:text-white rounded-md text-xs"
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/create-card" className="block px-3 py-2 text-white hover:bg-amber-600 rounded-md">
              Create
            </Link>
            <Link to="/about-us" className="block px-3 py-2 text-white hover:bg-amber-600 rounded-md">
              About
            </Link>
            <Link to="/contact-us" className="block px-3 py-2 text-white hover:bg-amber-600 rounded-md">
              Contact
            </Link>

            {/* Mobile Authentication */}
            <div className="pt-4 pb-3 border-t border-amber-600">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center mr-2">
                      {user.profileImage ? (
                        <img src={user.profileImage} className="w-full h-full rounded-full" alt="Profile" />
                      ) : (
                        <User className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {user?.fullname?.firstname || 'User'}
                      </p>
                      <p className="text-amber-200 text-xs">{user?.email || ''}</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link to="/user/profile" className="px-3 py-2 text-white hover:bg-amber-600 rounded-md flex items-center">
                      <CircleUserRound className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                    <Link to="/my-invitations" className="px-3 py-2 text-white hover:bg-amber-600 rounded-md flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      My Invitations
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-white hover:bg-amber-600 rounded-md flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/user/login" className="block px-3 py-2 text-white hover:bg-amber-600 rounded-md">
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