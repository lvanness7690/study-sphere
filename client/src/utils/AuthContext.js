// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a new context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to set the authenticated user
  const login = (userData) => {
    setUser(userData);
  };

  // Function to unset the authenticated user
  const logout = () => {
    setUser(null);
  };

  // Value provided by the context
  const value = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
