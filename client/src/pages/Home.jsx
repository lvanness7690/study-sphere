import React from 'react';

const Home = ({ topics, onTopicClick }) => {
  if (!topics || topics.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      <h2>Topics</h2>
      <div className="topic-cards">
        {topics.map((topic, index) => (
          <div key={index} className="topic-card" onClick={() => onTopicClick(topic)}>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
