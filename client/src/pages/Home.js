// Home.js
import React from 'react';
import TopicCard from '../components/TopicCard';

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      {/* Display list of study topics */}
      <TopicCard title="Topic 1" description="Description for Topic 1" />
      <TopicCard title="Topic 2" description="Description for Topic 2" />
      {/* Additional topic cards */}
    </div>
  );
};

export default Home;
