import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ isOpen, onClose, user, onLogOut }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user ? { ...user } : {});
  const navigate = useNavigate();

  // Modal overlay styling
  const modalStyle = {
    display: isOpen ? 'flex' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1001,
  };

  // Modal content styling, with relative positioning for the close button
  const modalContentStyle = {
    position: 'relative',
    padding: '20px',
    background: '#fff',
    borderRadius: '5px',
    width: '30%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  };

  // Close button styling
  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    fontSize: '20px',
    border: 'none',
    background: 'transparent',
    color: '#333',
  };

  // Input field styling
  const inputStyle = {
    width: '80%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  // Button styling for edit and logout actions
  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '80%',
  };

  const logOutButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '80%',
    marginTop: '10px',
  };

  // Handle toggling between edit and view modes
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedUser(user);
    }
  };

  // Handle input changes for user information
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  // Enhanced logout function to include navigation and modal closure
  const handleLogout = () => {
    onLogOut();
    navigate('/');
    onClose();
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <span style={closeButtonStyle} onClick={onClose}>&times;</span>
        <h2>{isEditing ? 'Edit Profile' : 'Profile'}</h2>
        <input style={inputStyle} type="text" placeholder="Name" value={isEditing ? editedUser.name : user?.name} onChange={handleChange} name="name" disabled={!isEditing} />
        <input style={inputStyle} type="email" placeholder="Email" value={isEditing ? editedUser.email : user?.email} onChange={handleChange} name="email" disabled={!isEditing} />
        {isEditing && (
          <input style={inputStyle} type="password" placeholder="New Password (optional)" onChange={handleChange} name="password" />
        )}
        {isEditing ? (
          <button style={buttonStyle} onClick={() => setIsEditing(false)}>Save Changes</button>
        ) : (
          <button style={buttonStyle} onClick={handleEditToggle}>Edit</button>
        )}
        <button style={logOutButtonStyle} onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Profile;
