import React from 'react';

const Footer = () => {
  // Define the styles for the footer
  const footerStyle = {
    width: '100%',
    padding: '20px 0',
    backgroundColor: '#f8f9fa', // Light gray background, adjust as needed
    textAlign: 'center', // Center-align the text
    position: 'absolute', // Optional: to stick at the bottom of the page
    bottom: 0, // Works with position: absolute
    left: 0, // Works with position: absolute
  };

  const footerContentStyle = {
    margin: '0 auto',
  };

  const footerLogoStyle = {
    fontWeight: 'bold',
  };

  // Apply the styles to your footer elements
  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        <div style={footerLogoStyle}>StudySphere © {new Date().getFullYear()}</div>
        <div className="footer-links">
          {/* Footer links can go here */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
