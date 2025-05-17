// components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ username, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Announcements</Link>
      <div className="ml-auto">
        {username && (
          <>
            <span className="text-white mx-3">Welcome, {username}</span>
            <button className="btn btn-outline-light" onClick={onLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
