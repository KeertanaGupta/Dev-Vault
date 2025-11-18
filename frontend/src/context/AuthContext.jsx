import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the "Provider" component
// This component will "wrap" our entire app and hold the user's info.
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // auth will be { _id, name, email }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom "hook" to easily access the context
export const useAuth = () => {
  return useContext(AuthContext);
};