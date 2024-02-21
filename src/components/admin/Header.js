import React from 'react';
import { IoLogOut } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 

const Header = () => {
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/admin/login'); 
  };

  return (
    <nav className="navbar navbar-expand px-3 border-bottom">
      <button className="btn" id="sidebar-toggle" type="button">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="navbar-collapse navbar">
        <ul className="navbar-nav"></ul>
        <button className="btn btn-white ms-3" onClick={handleLogout}>
          <IoLogOut />
        </button>
      </div>
    </nav>
  );
};

export default Header;
