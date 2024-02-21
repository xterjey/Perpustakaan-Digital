import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Menampilkan indikator loading jika autentikasi masih memuat
  }

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoute;
