import React from 'react';

const Navbar = ({ onLoginClick }) => {
  // Define the styles for the navbar and button
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#007bff', // Blue background
    color: 'white', // White font color
    position: 'fixed', // Change to fixed position
    top: 0, // Stick to the top
    width: '100%', // Ensure full width
    zIndex: 1000, // Ensure it's above other elements
  };

  const buttonStyle = {
    marginLeft: '10px',
    backgroundColor: '#28a745', // Green background
    color: 'white', // White text
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer',
  };

  return (
    <>
      <nav style={navbarStyle}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>StudySphere</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button style={buttonStyle} onClick={onLoginClick}>Login/Register</button>
        </div>
      </nav>
      {/* Add padding to your content to prevent it from being hidden behind the navbar */}
      <div style={{ paddingTop: '60px' }}>
        {/* Your content goes here */}
      </div>
    </>
  );
};

export default Navbar;
