import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">StudySphere © {new Date().getFullYear()}</div>
        <div className="footer-links">
          <a href="/about">About Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
