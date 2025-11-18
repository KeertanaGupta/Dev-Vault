import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from './context/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // Start in a loading state

  // This hook runs *once* when the app first loads
  useEffect(() => {
    const checkUser = async () => {
      try {
        // 1. Try to get the user's profile from the backend
        //    (This sends the 'jwt' cookie automatically)
        const response = await axios.get('/api/users/profile');
        
        // 2. If success, save the user to our global state
        setAuth(response.data);
      } catch (err) {
        // 3. If it fails (no cookie, invalid cookie), set auth to null
        setAuth(null);
      } finally {
        // 4. No matter what, we're done loading
        setIsLoading(false);
      }
    };
    
    checkUser();
  }, [setAuth]); // Dependency array

  // 5. While we're checking, show a loading screen
  if (isLoading) {
    return (
      <div className="fullscreen-loader">
        {/* We can add a real spinner here later */}
        Loading Dev Vault...
      </div>
    );
  }

  // 6. Once loading is done, show the app
  return (
    <div className="app-container">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;