import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_TOPIC_BY_ID, GET_POSTS_BY_TOPIC } from '../utils/queries';
import Discussion from '../components/Discussion'; // Importing Discussion modal component

// Define the WherebyEmbed component
const WherebyEmbed = ({ roomUrl, show }) => {
    if (!show) return null; // Only render the embed if show is true

    return <whereby-embed room={roomUrl} style={{ width: '100%', height: '600px' }} background="off"></whereby-embed>;
};

const Topic = () => {
  const { topicId } = useParams();
  const { data: topicData, loading: topicLoading, error: topicError } = useQuery(GET_TOPIC_BY_ID, {
    variables: { topicId },
  });
  const { data: postsData, loading: postsLoading, error: postsError, fetchMore } = useQuery(GET_POSTS_BY_TOPIC, {
    variables: { topicId, offset: 0, limit: 4 }, // Initially load 4 posts
  });

  const [showWhereby, setShowWhereby] = useState(false); // State to control visibility of WherebyEmbed
  const [showDiscussionModal, setShowDiscussionModal] = useState(false); // State to control visibility of Discussion modal
  const [selectedPost, setSelectedPost] = useState(null); // State to store the selected post for Discussion modal
  const [loadedPosts, setLoadedPosts] = useState(4); // State to track the number of loaded posts

  const openDiscussionModal = (post) => {
    setSelectedPost(post);
    setShowDiscussionModal(true);
  };

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        offset: loadedPosts,
        limit: 6, // Load 6 more posts
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          postsByTopic: [...prev.postsByTopic, ...fetchMoreResult.postsByTopic],
        });
      },
    });
    setLoadedPosts(prevLoadedPosts => prevLoadedPosts + 6); // Update the number of loaded posts
  };

  if (topicLoading || postsLoading) return <p>Loading...</p>;
  if (topicError) return <p>Error loading topic: {topicError.message}</p>;
  if (postsError) return <p>Error loading posts: {postsError.message}</p>;

  const { topic } = topicData;
  const posts = postsData.postsByTopic;

  // Your defined room URL
  const roomUrl = "https://zinc.whereby.com/study-spheree99a74f6-7e44-4c58-92c3-fa42ba327d33";

  return (
    <div style={styles.container}>
      <img src={topic.imageUrl} alt={topic.title} style={styles.topicImage} />
      <h2>Welcome to the {topic.title} Study Room</h2>
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

      {/* Live Study Room section */}
      <div style={styles.section}>
        <h3>Live Study Room</h3>
        <p>Want to study with a partner? Click below to join a live study room to collaborate with your peers.</p>
        {!showWhereby && (
          <button 
            style={{ ...styles.commentButton, backgroundColor: 'black' }}
            onClick={() => setShowWhereby(true)}>Join Now</button>
        )}
        {/* Render the Whereby embed conditionally */}
        <WherebyEmbed roomUrl={roomUrl} show={showWhereby} />
      </div>

      {/* Question Board section */}
      <div style={styles.section}>
        <h3>Discussion Board</h3>
        <p>You can post questions about the topic, and other students can comment and provide answers and guidance.</p>
      </div>

      {/* Start a New Discussion button */}
      <button style={{ ...styles.newDiscussionButton, backgroundColor: 'black' }}>Start a New Discussion</button>

      {/* Posts */}
      <div style={styles.postsContainer}>
        {posts && posts.length > 0 ? (
          posts.map((post, index) => {
            if (index < loadedPosts) {
              return (
                <div key={post.id} style={styles.post}>
                  <p>{post.content}</p>
                  <button 
                    style={{ ...styles.commentButton, backgroundColor: 'black', padding: '8px 14px' }} // Adjusted for slightly smaller size
                    onClick={() => openDiscussionModal(post)}>Open Discussion</button>
                </div>
              );
            }
            return null;
          })
        ) : (
          <p>No posts found for this topic.</p>
        )}
      </div>

      {/* Load More button */}
      {loadedPosts < posts.length && (
        <button style={{ ...styles.loadMoreButton, backgroundColor: 'black' }} onClick={handleLoadMore}>Load More</button>
      )}
      
      {/* Padding at the bottom */}
      <div style={{ height: '50px' }}></div>

      {/* Discussion Modal */}
      {showDiscussionModal && (
        <Discussion post={selectedPost} closeModal={() => setShowDiscussionModal(false)} />
      )}
    </div>
  );
};

// Maintaining your original styles
const styles = {
  container: {
    textAlign: 'center',
    margin: '0 auto',
    maxWidth: '1100px',
    padding: '40px',
    paddingBottom: '50px', // Adding padding at the bottom
    overflowX: 'auto', // Horizontal scrolling
    whiteSpace: 'nowrap', // Ensure items stay on one line
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
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginTop: '20px',
  },
  post: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
  },
  commentButton: {
    backgroundColor: 'black', // Black color
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
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
  newDiscussionButton: {
    backgroundColor: 'black', // Black color
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    marginTop: '20px', // Adjusted margin from top
  },
  loadMoreButton: {
    backgroundColor: 'black', // Black color
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    marginTop: '20px', // Adjusted margin from top
  },
};

export default Topic;
