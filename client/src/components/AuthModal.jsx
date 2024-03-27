import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { REGISTER_USER, LOGIN_USER } from '../utils/mutations';
import AuthService from '../utils/auth';


const AuthModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [registerUser] = useMutation(REGISTER_USER);
  const [loginUser] = useMutation(LOGIN_USER);


  const [registerUser] = useMutation(REGISTER_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({ variables: { email, password } });
      console.log('Logged in user:', data.loginUser.user);
      AuthService.login(data.loginUser.token);
      onClose();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const { data } = await registerUser({ variables: { username, email, password } });
      console.log('Registered user:', data.registerUser.user);
      AuthService.login(data.registerUser.token);
      onClose();
    } catch (error) {
      console.error('Registration failed:', error);
    }


  };

  const modalStyle = {
    display: isOpen ? 'flex' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1001,
  };

  const modalContentStyle = {
    padding: '20px',
    background: '#fff',
    borderRadius: '5px',
    width: '30%',
    maxWidth: '500px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  };

  const inputStyle = {
    width: '80%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '80%',
  };

  return (
    <div style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span className="close" onClick={onClose} style={{ cursor: 'pointer', alignSelf: 'flex-end', fontSize: '20px' }}>&times;</span>
        <h2>{isLogin ? 'Log In' : 'Register'}</h2>
        {!isLogin && (
          <input
            style={inputStyle}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer' }}>
          {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Log In'}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;

