import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadGallery from './pages/UploadGallery';
import UploadDocument from './pages/UploadDocument';
import PostNews from './pages/PostNews';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Mandatory from './pages/Mandatory';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      {token && <Navbar setToken={setToken} />}
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute token={token}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute token={token}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-gallery"
          element={
            <ProtectedRoute token={token}>
              <UploadGallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-document"
          element={
            <ProtectedRoute token={token}>
              <UploadDocument />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-news"
          element={
            <ProtectedRoute token={token}>
              <PostNews />
            </ProtectedRoute>
          }
        />
          <Route
          path="/mandatory-document"
          element={
            <ProtectedRoute token={token}>
              <Mandatory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;