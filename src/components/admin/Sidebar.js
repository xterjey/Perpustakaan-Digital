import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const Logo = '/logo512.png';

  const auth = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleSidebarToggle = () => {
      const sidebar = document.querySelector('#sidebar');
      sidebar.classList.toggle('collapsed');
    };

    const sidebarToggle = document.querySelector('#sidebar-toggle');

    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', handleSidebarToggle);
    }

    return () => {
      if (sidebarToggle) {
        sidebarToggle.removeEventListener('click', handleSidebarToggle);
      }
    };
  }, []);

  if (!auth.user) {
    return null; 
  }

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/dashboard/kategori', label: 'Kategori' },
    { to: '/admin/dashboard/buku', label: 'Buku' },
    { to: '/admin/dashboard/peminjaman', label: 'Pinjaman' },
    { to: '/admin/dashboard/laporan', label: 'Laporan Peminjaman' },
    { to: '/admin/dashboard/management', label: 'User Management' },
  ];

  return (
    <aside id="sidebar" className="js-sidebar">
      <div className="h-100">
      
        <div className="sidebar-logo">
        <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={Logo} alt="Logo" style={{ width: '50px', height: '50px' }} />
            </Link>
            </div>

        <ul className="sidebar-nav">
          {links.map((link, index) => {
            const isAdminLink = link.to === '/admin/dashboard/management' || 
            link.to === '/admin/dashboard/buku' || 
            link.to === '/admin/dashboard/kategori';

            const showLink = isAdminLink ? (auth.user && auth.user.role === 'admin') : true;
            return showLink ? (
              <li
                key={index}
                className={`sidebar-item ${location.pathname === link.to ? 'active' : ''}`}
              >
                <Link
                  to={link.to}
                  className="sidebar-link"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  {link.label}
                </Link>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
