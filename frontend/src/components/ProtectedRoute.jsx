import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  // 1. Get the 'auth' state from our global context
  const { auth } = useAuth();

  // 2. Check if the user is logged in
  if (auth) {
    // 3. If they are, show the page they are trying to access
    return <Outlet />;
  } else {
    // 4. If they are NOT, "bounce" them to the /auth page
    return <Navigate to="/auth" replace />;
  }
}

export default ProtectedRoute;