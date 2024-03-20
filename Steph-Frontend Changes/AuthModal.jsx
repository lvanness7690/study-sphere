import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const AuthModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/graphql', {
        query: `
          mutation {
            loginUser(email: "${email}", password: "${password}") {
              token
              user {
                // Specify user fields to be returned if needed
                // For example: _id, username, email, etc.
              }
            }
          }
        `
      });
      const { token, user } = response.data.data.loginUser;
      // Handle successful login (e.g., store token in localStorage, redirect user)
      console.log('Logged in user:', user);
      onClose();
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('/graphql', {
        query: `
          mutation {
            registerUser(username: "${name}", email: "${email}", password: "${password}") {
              token
              user {
                // Specify user fields to be returned if needed
                // For example: _id, username, email, etc.
              }
            }
          }
        `
      });
      const { token, user } = response.data.data.registerUser;
      // Handle successful registration (e.g., store token in localStorage, redirect user)
      console.log('Registered user:', user);
      onClose();
    } catch (error) {
      setError('Failed to register user');
    }
  };

  // CSS-in-JS styles
  const modalStyle = {
    display: isOpen ? 'flex' : 'none', // Use flex to center the modal content
    position: 'fixed', // Fixed position to stay in place upon scrolling
    top: 0,
    left: 0,
    width: '100%', // Full width to cover the entire viewport
    height: '100%', // Full height to cover the entire viewport
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  };

  const modalContentStyle = {
    padding: '20px',
    background: '#fff',
    borderRadius: '5px',
    width: '30%', // Adjusted for a more modal-like appearance
    maxWidth: '500px', // Maximum width, prevents it from being too wide on larger screens
    minHeight: '200px', // Minimum height to ensure it doesn't look too small
    display: 'flex', // Using flex to organize the content
    flexDirection: 'column', // Stack the children vertically
    alignItems: 'center', // Align items in the center of the modal content
    gap: '10px', // Adds a gap between items
  };

  const inputStyle = {
    width: '80%', // Makes input take 80% of the modal content width
    padding: '10px', // Adds some padding inside the input fields
    margin: '5px 0', // Adds some margin around each input field
    borderRadius: '5px', // Rounds the corners of the input fields
    border: '1px solid #ccc', // Adds a subtle border
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '80%', // Match input width for consistency
  };

  return (
    <div style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span className="close" onClick={onClose} style={{cursor: 'pointer', alignSelf: 'flex-end', fontSize: '20px'}}>&times;</span>
        <h2>{isLogin ? 'Log In' : 'Register'}</h2>
        {!isLogin && (
          <input
            style={inputStyle}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          style={inputStyle}
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={buttonStyle} onClick={isLogin ? handleLogin : handleRegister}>
          {isLogin ? 'Log In' : 'Register'}
        </button>
        <p onClick={() => setIsLogin(!isLogin)} style={{cursor: 'pointer'}}>
          {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Log In'}
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default AuthModal;
