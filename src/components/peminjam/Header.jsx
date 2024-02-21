import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaBook, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Logo = '/logo512.png';

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout gagal:', error);
    }
  };

  return (
    <header className="bg-blue text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-8 mr-2" />
            <span className="text-xl font-bold text-white">Perpustakaan Digital</span>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center text-white no-underline">
              <FaHome className="mr-1" />
              Dashboard
            </Link>
            <Link to="/dashboard/peminjam" className="flex items-center text-white no-underline">
              <FaUsers className="mr-1" />
              Peminjaman
            </Link>
            <Link to="/dashboard/koleksi" className="flex items-center text-white no-underline">
              <FaBook className="mr-1" />
              Koleksi
            </Link>
            <button onClick={handleLogout} className="flex items-center text-white no-underline">
              <FaSignOutAlt className="mr-1" />
              Logout
            </button>
          </nav>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2">
            <div className="flex flex-col">
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-100 no-underline"
              >
                <FaHome className="mr-2" />
                Dashboard
              </Link>
              <Link
                to="/dashboard/peminjam"
                className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-100 no-underline"
              >
                <FaUsers className="mr-2" />
                Peminjaman
              </Link>
              <Link
                to="/dashboard/koleksi"
                className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-100 no-underline"
              >
                <FaBook className="mr-2" />
                Koleksi
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-100 no-underline"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
