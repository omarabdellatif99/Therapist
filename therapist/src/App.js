// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegistrationForm from './pages/Register';
import SessionPage from './pages/Session';
import ControlPage from './pages/Register'; // Import the new ControlPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/Register" element={<ControlPage />} /> {/* Add the new route */}
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
