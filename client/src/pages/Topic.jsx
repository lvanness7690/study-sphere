import React from 'react';

const Topic = ({ topic }) => {
  // Define CSS-in-JS styles
  const topicStyle = {
    textAlign: 'center', // Center-aligns the title and description
    margin: '0 auto', // Centers the topic container
    maxWidth: '800px', // Maximum width for better readability
    padding: '20px', // Adds some padding around the content
  };

  const postCardsStyle = {
    display: 'flex', // Use flexbox to layout post cards
    flexDirection: 'column', // Stack post cards vertically
    alignItems: 'center', // Center-align the post cards
    gap: '20px', // Adds space between each post card
    marginTop: '20px', // Space between description and post cards
  };

  return (
    <div style={topicStyle}>
      <h2>{topic.title}</h2>
      <p>{topic.description}</p>
      <div style={postCardsStyle}>
        {/* Post cards will be mapped here */}
      </div>
    </div>
  );
};

export default Topic;
