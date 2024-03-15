import React from 'react';
import logo from '../assets/Study-Sphere-Vertical.png'; // Make sure the path to your image is correct

const Welcome = ({ onLoginClick }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '10%', padding: '0 20px' }}>
      {/* Increased marginBottom for the logo for more space */}
      <img src={logo} alt="StudySphere Logo" style={{ maxWidth: '300px', marginTop: '20px', marginBottom: '40px' }} />
      {/* Container for restricting content width to 75% and centering */}
      <div style={{ margin: 'auto', width: '75%' }}>
      <p style={{ fontSize: '1.2rem' }}>
          StudySphere is a dynamic, interactive student social network designed to revolutionize the way students connect and study together online. By integrating real-time video study groups and interactive discussion boards, StudySphere offers a unique platform for academic collaboration and peer support. It's not just about studying alone; it's about creating a community of learners who can grow together.
          {/* Repeat or elaborate on the content to make it three times longer */}
          StudySphere empowers students by providing tools for scheduling study sessions, sharing academic resources, and facilitating group projects, thereby enhancing the overall learning experience. The platform is designed to cater to students across various educational fields, promoting interdisciplinary learning and networking.
          With StudySphere, learners have the opportunity to engage in meaningful academic exchanges, fostering a culture of knowledge sharing and mutual growth. The platform's intuitive design ensures that students can easily navigate and utilize the features, making online studying more effective and enjoyable.
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
    </div>
  );
};

export default Welcome;
