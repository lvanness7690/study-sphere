// src/pages/Welcome.jsx

import React from 'react';

const Welcome = ({ onLoginClick }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '10%', padding: '0 20px' }}>
      <h1>StudySphere</h1>
      <p>
        StudySphere is a dynamic, interactive student social network designed to revolutionize the way students connect and study together online. By integrating real-time video study groups and interactive discussion boards, StudySphere offers a unique platform for academic collaboration and peer support. It's not just about studying alone; it's about creating a community of learners who can grow together.
      </p>
      <button onClick={onLoginClick} style={{
        backgroundColor: '#28a745', // Green background
        color: 'white', // White text
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px', // Rounded corners
        cursor: 'pointer',
        marginTop: '20px',
      }}>
        Login/Register
      </button>
    </div>
  );
};

export default Welcome;
