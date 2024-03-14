import React from 'react';

const Navbar = ({ isLoggedIn, onLogout, onOpenAuthModal }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">StudySphere</div>
      <div className="navbar-menu">
        {!isLoggedIn ? (
          <button className="navbar-button" onClick={onOpenAuthModal}>Login/Register</button>
        ) : (
          <div>
            <button className="navbar-profile-button">Profile</button>
            <button className="navbar-logout-button" onClick={onLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
