import React from 'react';
import logo from '../assets/Study-Sphere-Vertical.png'; // Make sure the path to your image is correct
import backgroundSVG from '../assets/Background.jpeg';

const Welcome = ( ) => {
  return (
    <div style={{
      textAlign: 'center',
      backgroundImage: `url(${backgroundSVG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      position: 'relative',
      marginTop: '-60px', // Adjust if necessary to match your navbar's height
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        minHeight: '100vh',
        paddingTop: '60px', // Adjusted for alignment
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Centering vertically
        alignItems: 'center',
        padding: '20px',
        width: '100vw',
      }}>
        {/* Container for the logo and text content, ensuring they're closely positioned */}
        <div style={{ maxWidth: '75%', marginBottom: '20px' }}>
          <img src={logo} alt="StudySphere Logo" style={{ maxWidth: '300px', marginBottom: '20px' }} />
          <p style={{ fontSize: '1.2rem' }}>
            StudySphere is a dynamic, interactive student social network designed to revolutionize the way students connect and study together online. By integrating real-time video study groups and interactive discussion boards, StudySphere offers a unique platform for academic collaboration and peer support. It's not just about studying alone; it's about creating a community of learners who can grow together.
            StudySphere empowers students by providing tools for scheduling study sessions, sharing academic resources, and facilitating group projects, thereby enhancing the overall learning experience. The platform is designed to cater to students across various educational fields, promoting interdisciplinary learning and networking.
            With StudySphere, learners have the opportunity to engage in meaningful academic exchanges, fostering a culture of knowledge sharing and mutual growth. The platform's intuitive design ensures that students can easily navigate and utilize the features, making online studying more effective and enjoyable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;


