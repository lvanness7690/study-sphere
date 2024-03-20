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
      </p>
      <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '20px',
          maxWidth: '950px',
          margin: '0 auto',
        }}>
        {data.topics.map((topic) => (
          <div key={topic.id} style={{
              width: '450px',
              minHeight: '300px',
              textAlign: 'center',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              padding: '20px',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <img src={topic.imageUrl || 'placeholderImageURL'} alt={topic.title} style={{ maxHeight: '50px', maxWidth: '100px', width: 'auto', height: 'auto', borderRadius: '5px', marginBottom: '20px' }} />
            <h3>{topic.title}</h3>
            <p style={{ flexGrow: 1 }}>{topic.description}</p>
            <button style={{
                backgroundColor: '#28a745', // Ensure this matches your desired green
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 15px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
              onClick={() => navigate(`/topic/${topic.id}`)}>Enter</button>
          </div>
        ))}
      </div>
      <button style={{
        display: 'block',
        margin: '20px auto',
        backgroundColor: '#28a745', // Ensure this matches your desired green
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 15px',
        cursor: 'pointer',
      }}>
        Add New Topic<br />
        <span style={{ fontSize: 'smaller' }}>Feature Coming Soon!</span>
      </button>
    </div>
  );
};

export default Home;
