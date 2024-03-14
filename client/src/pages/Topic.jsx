import React from 'react';

const Topic = ({ topic }) => {
  return (
    <div className="topic">
      <h2>{topic.title}</h2>
      <p>{topic.description}</p>
      <div className="post-cards">
        {/* Post cards */}
      </div>
    </div>
  );
};

export default Topic;
