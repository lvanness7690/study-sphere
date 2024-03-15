import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOPICS } from '../utils/queries'; // Make sure this path is correct
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // This is the correct usage
  const { loading, error, data } = useQuery(GET_TOPICS);

  // Styles are defined here...

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Topics</h2>
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
        {data.topics.map((topic) => (
          <div key={topic.id} style={{
              width: '200px',
              textAlign: 'center',
              position: 'relative',
              cursor: 'pointer',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              padding: '10px',
            }}
            onMouseEnter={e => e.currentTarget.lastChild.style.display = 'block'}
            onMouseLeave={e => e.currentTarget.lastChild.style.display = 'none'}
            onClick={() => navigate(`/topic/${topic.id}`)}> {/* Updated this line */}
            <img src={topic.imageUrl || 'placeholderImageURL'} alt={topic.title} style={{ width: '100%', borderRadius: '5px' }} />
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