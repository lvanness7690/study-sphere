// ProfileCard.js
import React from 'react';

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      {/* Additional profile information */}
    </div>
  );
};

export default ProfileCard;
