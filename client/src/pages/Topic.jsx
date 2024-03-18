import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_TOPIC_BY_ID, GET_POSTS_BY_TOPIC } from '../utils/queries';
import "@whereby.com/browser-sdk/embed";

// Define the WherebyEmbed component
const WherebyEmbed = ({ roomUrl }) => {
    return <whereby-embed room={roomUrl} style={{ width: '100%', height: '600px' }} background="off"></whereby-embed>;
};

const Topic = () => {
  const { topicId } = useParams();
  const { data: topicData, loading: topicLoading, error: topicError } = useQuery(GET_TOPIC_BY_ID, {
    variables: { topicId },
  });
  const { data: postsData, loading: postsLoading, error: postsError } = useQuery(GET_POSTS_BY_TOPIC, {
    variables: { topicId },
  });

  if (topicLoading || postsLoading) return <p>Loading...</p>;
  if (topicError) return <p>Error loading topic: {topicError.message}</p>;
  if (postsError) return <p>Error loading posts: {postsError.message}</p>;

  const { topic } = topicData;
  const posts = postsData.postsByTopic;

  // Define your room URL (You might want to make this dynamic or topic-specific)
  const roomUrl = "https://zinc.whereby.com/study-spheree99a74f6-7e44-4c58-92c3-fa42ba327d33";

  return (
    <div style={styles.container}>
      <img src={topic.imageUrl} alt={topic.title} style={styles.topicImage} />
      <h2>{topic.title}</h2>
      <p style={{ ...styles.section, marginTop: '20px' }}>{topic.description}</p>

      {/* Display Facts */}
      <div style={styles.section}>
        <h3>Facts</h3>
        <ul style={styles.factsList}>
          {topic.facts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>

      <div style={styles.section}>
        <h3>Live Study Room</h3>
        <p>Want to study with a partner? Click here to join a live study room to collaborate with your peers.</p>
        {/* Render the Whereby embed */}
        <WherebyEmbed roomUrl={roomUrl} />
      </div>
      <div style={styles.section}>
        <h3>Question Board</h3>
        <p>You can post questions about the topic, and other students can comment and provide answers and guidance.</p>
      </div>
      <div style={{ ...styles.postsContainer, marginTop: '20px' }}>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={styles.post}>
              <p>{post.content}</p>
              <button style={styles.commentButton}>Comment</button>
            </div>
          ))
        ) : (
          <p>No posts found for this topic.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    margin: '0 auto',
    maxWidth: '1100px',
    padding: '40px',
  },
  topicImage: {
    maxHeight: '100px',
    maxWidth: '200px',
    width: 'auto',
    height: 'auto',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  section: {
    marginTop: '60px',
  },
  postsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns
    gridTemplateRows: 'repeat(5, 1fr)', // 5 rows
    gap: '20px', // Gap between grid items
    marginBottom: '100px',
  },
  post: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    width: '100%', // Full width of grid cell
    height: '100%', // Full height of grid cell
  },
  commentButton: {
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  factsList: {
    textAlign: 'left',
    listStyleType: 'disc',
    listStylePosition: 'inside',
    padding: '0',
    marginTop: '10px',
  },
};

export default Topic;
