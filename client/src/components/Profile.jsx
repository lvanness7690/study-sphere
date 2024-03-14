import React from 'react';

const Profile = ({ username, email }) => {
  return (
    <div className="profile">
      <h2>Profile</h2>
      <div>
        <label>Username:</label>
        <span>{username}</span>
      </div>
      <div>
        <label>Email:</label>
        <span>{email}</span>
      </div>
    </div>
  );
};

export default Profile;
