import React from "react";
import "../styles/theme.css";
import { isAuthenticated, logout } from "../services/auth";

/**
 * Header with logo and navigation
 * PUBLIC_INTERFACE
 */
export default function Header({ onLoginClick }) {
  const authed = isAuthenticated();

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <header className="header header-bar">
      <div className="brand">
        <div className="logo">🐾</div>
        <span>WildTrack</span>
      </div>
      <nav className="nav" aria-label="Main navigation">
        <a href="#dashboard" className="active">Dashboard</a>
        <a href="#map">Map</a>
        <a href="#analytics">Analytics</a>
      </nav>
      <div className="row">
        {authed ? (
          <button className="btn" onClick={handleLogout} aria-label="Logout">
            Logout
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onLoginClick} aria-label="Login">
            Login
          </button>
        )}
      </div>
    </header>
  );
}
