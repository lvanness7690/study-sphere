import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import { GET_TOPIC_BY_ID, GET_POSTS_BY_TOPIC } from '../utils/queries';
import Discussion from '../components/Discussion'; // Importing Discussion modal component
import "@whereby.com/browser-sdk/embed"; // Importing Whereby embed SDK

// Define the WherebyEmbed component
const WherebyEmbed = ({ roomUrl }) => {
  return <whereby-embed room={roomUrl} background="off" style={{ width: '100%', height: '600px' }} />;
};

// NewDiscussionForm component
const NewDiscussionForm = ({ closeFormModal, topicId}) => {
  const [addPost ] = useMutation(ADD_POST);
  const [content, setContent] = useState('');

  console.log(typeof topicId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPost({
        variables: {
          content: content,
          topicId: topicId
        }
      });
      // Reset the form fields after successful submission
      setContent('');
      // Close the discussion form modal
      closeFormModal();
    } catch (error) {
      // Handle any errors from the mutation
      console.error('Error adding topic:', error);
    }
  };

  return (
    <div>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your Post here" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const Topic = () => {
const { topicId } = useParams();
const { data: topicData, loading: topicLoading, error: topicError } = useQuery(GET_TOPIC_BY_ID, {
  variables: { topicId },
});
const { data: postsData, loading: postsLoading, error: postsError, fetchMore } = useQuery(GET_POSTS_BY_TOPIC, {
  variables: { topicId, offset: 0, limit: 4 }, // Initially load 4 posts
});

const [showEmbed, setShowEmbed] = useState(false); // State to control visibility of Whereby embed
const [showDiscussionModal, setShowDiscussionModal] = useState(false); // State to control visibility of Discussion modal
const [showDiscussionForm, setShowDiscussionForm] = useState(false); // State to control visibility of Discussion modal
const [selectedPost, setSelectedPost] = useState(null); // State to store the selected post for Discussion modal
const [loadedPosts, setLoadedPosts] = useState(4); // State to track the number of loaded posts

const openDiscussionModal = (post) => {
  setSelectedPost(post);
  setShowDiscussionModal(true);
};

const handleLoadMore = (e) => {
  e.preventDefault
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

const handleJoinNow = (e) => {
  e.preventDefault
  setShowEmbed(true); // Show the embed when Join Now button is clicked
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
      {!showEmbed ? (
        <button 
          style={{ ...styles.joinNowButton, backgroundColor: 'black' }} 
          onClick={handleJoinNow}>Join Now</button>
      ) : (
        <WherebyEmbed roomUrl={roomUrl} />
      )}
    </div>

    {/* Question Board section */}
    <div style={styles.section}>
      <h3>Discussion Board</h3>
      <p>You can post questions about the topic, and other students can comment and provide answers and guidance.</p>
    </div>

      {/* Start a New Discussion button */}
      <div style={{ marginTop: '20px' }}>
        <button
          style={{ ...styles.newDiscussionButton, backgroundColor: 'black' }}
          onClick={() => setShowDiscussionForm(true)}
        >
          Start a New Discussion
        </button>
      </div>

      {/* New Discussion Form Modal */}
      {showDiscussionForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <span style={styles.closeButton} onClick={() => setShowDiscussionForm(false)}>&times;</span>
            <NewDiscussionForm closeFormModal={() => setShowDiscussionForm(false)} topicId={topicId} />
          </div>
        </div>
      )}

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
                  onClick={() =>openDiscussionModal(post)}>Open Discussion</button>
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
joinNowButton: {
  backgroundColor: 'black', // Black color
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px 15px',
  cursor: 'pointer',
},
modal: {
  display: 'block', /* Ensure the modal is displayed */
  position: 'fixed', /* Fixed position so it stays in the viewport */
  zIndex: '1', /* Set z-index to display the modal above other content */
  left: '0',
  top: '0',
  width: '100%', /* Full width */
  height: '100%', /* Full height */
  overflow: 'auto', /* Enable scrolling if the content overflows */
  backgroundColor: 'rgba(0,0,0,0.4)', /* Semi-transparent background */
},
modalContent: {
  backgroundColor: '#fefefe', /* Modal content background color */
  margin: '15% auto', /* Center the modal vertically and horizontally */
  padding: '20px',
  border: '1px solid #888',
  width: '80%', /* Set the width of the modal content */
},
closeButton: {
  color: '#aaa',
  float: 'right',
  fontSize: '28px',
  fontWeight: 'bold',
},
};

export default Topic;