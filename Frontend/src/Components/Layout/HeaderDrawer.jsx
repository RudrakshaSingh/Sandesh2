import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const HeaderDrawer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-amber-600 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold">Sandesh</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <a href="/" className="text-white hover:text-amber-100 py-2 transition duration-150">
                  Home
                </a>
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
                    <a href="/templates/wedding" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">
                      Wedding
                    </a>
                    <a href="/templates/festivals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">
                      Festivals
                    </a>
                    <a href="/templates/corporate" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">
                      Corporate
                    </a>
                  </div>
                )}
              </li>
              <li>
                <a href="/create" className="text-white hover:text-amber-100 py-2 transition duration-150">
                  Create
                </a>
              </li>
              <li>
                <a href="/about" className="text-white hover:text-amber-100 py-2 transition duration-150">
                  About
                </a>
              </li>
            </ul>
          </nav>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-white hover:text-amber-100 text-sm">
              Log in
            </a>
            <a
              href="/signup"
              className="bg-white text-amber-600 px-4 py-2 rounded text-sm font-medium hover:bg-amber-50 transition duration-150"
            >
              Sign up
            </a>
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

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-amber-700">
            <a href="/" className="block px-3 py-2 text-white hover:bg-amber-600 rounded-md">
              Home
            </a>
            <button
              onClick={toggleDropdown}
              className="w-full text-left px-3 py-2 text-white hover:bg-amber-600 rounded-md flex items-center justify-between"
            >
              Templates
              <ChevronDown className="h-4 w-4" />
            </button>
            {isDropdownOpen && (
              <div className="pl-4 space-y-1">
                <a href="/templates/wedding" className="block px-3 py-2 text-amber-100 hover:bg-amber-600 rounded-md text-sm">
                  Wedding
                </a>
                <a href="/templates/festivals" className="block px-3 py-2 text-amber-100 hover:bg-amber-600 rounded-md text-sm">
                  Festivals
                </a>
                <a href="/templates/corporate" className="block px-3 py-2 text-amber-100 hover:bg-amber-600 rounded-md text-sm">
                  Corporate
                </a>
              </div>
            )}
            <a href="/create" className="block px-3 py-2 text-white hover:bg-amber-600 rounded-md">
              Create
            </a>
            <a href="/about" className="block px-3 py-2 text-white hover:bg-amber-600 rounded-md">
              About
            </a>
            <div className="pt-4 pb-3 border-t border-amber-600">
              <a href="/login" className="block px-3 py-2 text-white hover:bg-amber-600 rounded-md">
                Log in
              </a>
              <a href="/signup" className="block px-3 py-2 text-white bg-amber-600 hover:bg-amber-500 rounded-md mt-1">
                Sign up
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderDrawer;