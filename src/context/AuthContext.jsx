import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    authToken: localStorage.getItem('authToken') || null,
    user: null,
    loading: true,
    error: null,
  });

  const fetchUser = useCallback(async () => {
    try {
      if (authState.authToken) {
        const response = await axios.get('/me');
        setAuthState((prevState) => ({
          ...prevState,
          user: response.data.user,
          loading: false,
        }));
      } else {
        setAuthState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    } catch (error) {
      console.error('Error user:', error);
      setAuthState((prevState) => ({
        ...prevState,
        user: null,
        loading: false,
        error: 'Error user ',
      }));
    }
  }, [authState.authToken]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLoginSuccess = (authToken) => {
    localStorage.setItem('authToken', authToken);
    setAuthState((prevState) => ({ ...prevState, authToken, error: null }));
  };

  const logout = () => {
    try {
      localStorage.removeItem('authToken');
      setAuthState({ authToken: null, user: null, loading: false, error: null });
    } catch (error) {
      console.error('Logout error:', error);
      setAuthState((prevState) => ({ ...prevState, error: 'Logout Gagal' }));
    }
  };

  const isAuthenticated = () => {
    return authState.authToken !== null;
  };

  const getUsername = () => {
    return authState.user ? authState.user.username : '';
  };

  const getUserID = () => {
    return authState.user ? authState.user.UserID : null;
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        logout,
        isAuthenticated,
        getUsername,
        getUserID,
        loading: authState.loading,
        error: authState.error,
        handleLoginSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
