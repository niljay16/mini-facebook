import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { getUser, logout } from './utils/auth';

function App() {
  const [user, setUser] = useState(getUser());

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <Router>
      <NavBar username={user?.username} onLogout={handleLogout} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
