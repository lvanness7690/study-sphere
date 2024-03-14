import React from 'react';

const Navbar = ({ onLoginClick }) => {
  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>StudySphere</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button style={{ marginLeft: '10px' }} onClick={onLoginClick}>Login/Register</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
