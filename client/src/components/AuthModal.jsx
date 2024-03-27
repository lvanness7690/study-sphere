import React, { useState } from 'react';
import { REGISTER_USER, LOGIN_USER } from '../utils/mutations';
import AuthService from '../utils/auth';
import { useMutation } from '@apollo/client';

const AuthModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [registerUser] = useMutation(REGISTER_USER);
  const [loginUser] = useMutation(LOGIN_USER);


  const handleLogin = async() => {
    const{data} = await loginUser({
      variables: {
        email,password},
    })
    AuthService.login(data.loginUser.token);
    console.log('Logging in with email:', email, 'and password:', password);
    onClose();
  };

  const handleRegister = async() => {
    const {data} = await registerUser({
      variables: {
        username: name, email, password,
      },
    })
    AuthService.login(data.registerUser.token);
    console.log('Registering with name:', name, 'email:', email, 'and password:', password);
    onClose();
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
    zIndex: 1001, // Ensure it appears on top of other elements
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
    backgroundColor: '#28a745',
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
      </div>
    </div>
  );
};

export default AuthModal;
