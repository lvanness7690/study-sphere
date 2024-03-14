// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">StudySphere</Link>
      </div>
      <div>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
