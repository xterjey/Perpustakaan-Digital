import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {

  return (
<footer className="w-full py-6 bg-blue text-white">
      <div className="container flex flex-col md:flex-row items-center justify-between px-4 text-sm md:px-6">
        <div className="flex items-center">
          <span className="font-semibold text-white">Jayourbae.biz.id</span>
        </div>
        <nav className="flex flex-col md:flex-row md:gap-4 md:grid md:grid-flow-col">
          {/* Your navigation items here */}
        </nav>
        <div className="grid text-xs sm:flex sm:items-center md:justify-self-end md:gap-4">
          <div className="text-white">support@jayourbae.biz.id</div>
        </div>
        <div className="flex items-center justify-end md:gap-4 mt-3 md:mt-0">
          <Link
            to="#"
            className="text-white hover:text-white-900 mr-3 mb-2 md:mb-0"
          >
            <FaFacebook className="w-4 h-4" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            to="#"
            className="text-white hover:text-white-900 mr-3 mb-2 md:mb-0"
          >
            <FaTwitter className="w-4 h-4" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            to="#"
            className="text-white hover:text-white-900 mb-2 md:mb-0"
          >
            <FaInstagram className="w-4 h-4" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
