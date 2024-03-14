import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    onLogin(email, password);
  };

  const handleRegister = () => {
    onRegister(email, password);
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{isLogin ? 'Log In' : 'Register'}</h2>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={isLogin ? handleLogin : handleRegister}>{isLogin ? 'Log In' : 'Register'}</button>
        <p onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Log In'}</p>
      </div>
    </div>
  );
};

export default AuthModal;
