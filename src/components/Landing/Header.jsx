import React, { useState } from 'react';
import { FaUser, FaSignInAlt, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Logo = '/logo512.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white text-gray-900 p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-8 mr-2" />
            <span className="text-xl font-bold">Perpustakaan Digital</span>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-900 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="flex items-center text-gray-900 no-underline">
              <FaSignInAlt className="mr-1" />
              Login
            </Link>
            <Link to="/register" className="flex items-center text-gray-900 no-underline">
              <FaUser className="mr-1" />
              Register
            </Link>
          </nav>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2">
            <div className="flex flex-col">
              <Link
                to="/login"
                className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 no-underline"
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 no-underline"
              >
                <FaUser className="mr-2" />
                Register
              </Link>
              {/* Add more dropdown items as needed */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
