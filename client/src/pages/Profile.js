// Profile.js
import React from 'react';
import ProfileCard from '../components/ProfileCard';

const Profile = ({ user }) => {
  return (
    <div>
      <h2>Profile</h2>
      <ProfileCard user={user} />
      {/* Additional profile information or actions */}
    </div>
  );
};

export default Profile;
