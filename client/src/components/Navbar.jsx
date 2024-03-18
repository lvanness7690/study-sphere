import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Study-Sphere-Horizontal.png'; // Adjust the path as needed

const Navbar = ({ onLoginClick }) => {
  const navigate = useNavigate();

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

  const buttonStyle = {
    marginLeft: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  // Ensure your image style maintains appropriate sizing and cursor behavior
  const logoStyle = {
    cursor: 'pointer',
    maxHeight: '50px', // Adjust as needed to fit the navbar
  };

  return (
    <>
      <nav style={navbarStyle}>
        {/* Replace div with img tag for the logo */}
        <img src={logo} style={logoStyle} alt="StudySphere Logo" onClick={() => navigate('/home')} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button style={buttonStyle} onClick={onLoginClick}>Login/Register</button>
        </div>
      </nav>
      <div style={{ paddingTop: '60px' }}>
        {/* Your content goes here */}
      </div>
    </>
  );
};

export default Navbar;
