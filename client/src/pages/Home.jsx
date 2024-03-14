import React from 'react';

const Home = ({ topics, onTopicClick }) => {
  // Define the styles
  const homeStyle = {
    textAlign: 'center', // Centers all text within
  };

  const topicCardsStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap', // Allows cards to wrap to the next line
    gap: '20px', // Spacing between cards
  };

  const topicCardStyle = {
    width: '200px', // Set a fixed width for each card
    textAlign: 'center', // Center text inside each card
    position: 'relative', // For absolute positioning of the button
    cursor: 'pointer', // Indicates the card is clickable
    borderRadius: '5px', // Optional: for rounded corners
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // Optional: for a slight shadow
    padding: '10px', // Spacing inside each card
  };

  const topicImageStyle = {
    width: '100%', // Make the image fill the card
    borderRadius: '5px', // Optional: match the card's border radius
  };

  const topicButtonStyle = {
    display: 'none', // Initially hide the button
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)', // Center the button horizontally
    backgroundColor: '#007bff', // Example: blue background
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
  };

  if (!topics || topics.length === 0) {
    return <div style={homeStyle} className="loading">Loading...</div>;
  }

  return (
    <div style={homeStyle} className="home">
      <h2>Topics</h2>
      <div style={topicCardsStyle} className="topic-cards">
        {topics.map((topic, index) => (
          <div key={index} style={topicCardStyle} className="topic-card" onMouseEnter={e => e.currentTarget.lastChild.style.display = 'block'} onMouseLeave={e => e.currentTarget.lastChild.style.display = 'none'} onClick={() => onTopicClick(topic)}>
            <img src={topic.imageUrl} alt={topic.title} style={topicImageStyle} />
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <button style={topicButtonStyle}>Enter</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
