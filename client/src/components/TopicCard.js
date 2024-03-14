// TopicCard.js
import React from 'react';

const TopicCard = ({ title, description }) => {
  return (
    <div className="topic-card">
      <h2>{title}</h2>
      <p>{description}</p>
      {/* Button to navigate to the topic page */}
    </div>
  );
};

export default TopicCard;
