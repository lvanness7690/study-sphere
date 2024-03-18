import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Study-Sphere-Horizontal.png';

const Navbar = ({ onLoginClick, onProfileClick, user }) => {
  const navigate = useNavigate();

  // Styling for the Navbar
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#000000',
    color: 'white',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
  };

  // Styling for the buttons
  const buttonStyle = {
    marginLeft: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  // Styling for the logo
  const logoStyle = {
    cursor: 'pointer',
    maxHeight: '50px',
  };

  return (
    <>
      <nav style={navbarStyle}>
        <img src={logo} style={logoStyle} alt="StudySphere Logo" onClick={() => navigate('/home')} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            // Show Profile button if user is logged in
            <button style={buttonStyle} onClick={onProfileClick}>Profile</button>
          ) : (
            // Show Login/Register button if user is not logged in
            <button style={buttonStyle} onClick={onLoginClick}>Login/Register</button>
          )}
        </div>
      </nav>
      <div style={{ paddingTop: '60px' }}>
        {/* Padding to ensure content is not hidden by the fixed navbar */}
      </div>
    </>
  );
};

export default Navbar;
