// StudySession.js
import React from 'react';

const StudySession = ({ title, description }) => {
  return (
    <div className="study-session">
      <h2>{title}</h2>
      <p>{description}</p>
      {/* Button to join the study session */}
    </div>
  );
};

export default StudySession;
