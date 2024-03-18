import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOPICS } from '../utils/queries';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_TOPICS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Topics</h2>
      <p style={{ marginBottom: '40px' }}>
        StudySphere is an innovative platform designed to revolutionize the way students study online. 
        Hover over each topic to enter the study room.
      </p>
      <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '20px',
          maxWidth: '950px', // Control the overall container width
          margin: '0 auto', // Center the container
        }}>
        {data.topics.map((topic) => (
          <div key={topic.id} style={{
              width: '450px',
              height: 'auto',
              textAlign: 'center',
              position: 'relative',
              cursor: 'pointer',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onMouseEnter={e => e.currentTarget.lastChild.style.display = 'block'}
            onMouseLeave={e => e.currentTarget.lastChild.style.display = 'none'}
            onClick={() => navigate(`/topic/${topic.id}`)}>
            <img src={topic.imageUrl || 'placeholderImageURL'} alt={topic.title} style={{ maxHeight: '50px', maxWidth: '100px', width: 'auto', height: 'auto', borderRadius: '5px', marginBottom: '20px' }} />
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <button style={{
                display: 'none',
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 15px',
                cursor: 'pointer',
              }}>Enter</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
