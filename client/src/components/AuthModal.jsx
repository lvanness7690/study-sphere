import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    console.log('Logging in with email:', email, 'and password:', password);
    onClose();
  };

  const handleRegister = () => {
    console.log('Registering with email:', email, 'and password:', password);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'show' : 'hide'}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{isLogin ? 'Log In' : 'Register'}</h2> {/* Corrected Line */}
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={isLogin ? handleLogin : handleRegister}>{isLogin ? 'Log In' : 'Register'}</button>
        <p onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Log In'}</p>
      </div>
    </div>
  );
};

export default AuthModal;
