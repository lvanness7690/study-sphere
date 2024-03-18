import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Profile = ({ isOpen, onClose, user, onLogOut }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user ? { ...user } : {});
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Styling for the modal overlay
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
    zIndex: 1001, // Ensure modal is on top
  };

  // Define modalContentStyle for the content inside the modal
  const modalContentStyle = {
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

  // Input field styling
  const inputStyle = {
    width: '80%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  // Button styling
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

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  // Enhanced logout function that navigates to home after logout
  const handleLogout = () => {
    onLogOut();
    navigate('/');
    onClose();
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{isEditing ? 'Edit Profile' : 'Profile'}</h2>
        <input style={inputStyle} type="text" placeholder="Name" value={isEditing ? editedUser.name : user?.name} onChange={handleChange} name="name" disabled={!isEditing} />
        <input style={inputStyle} type="email" placeholder="Email" value={isEditing ? editedUser.email : user?.email} onChange={handleChange} name="email" disabled={!isEditing} />
        {isEditing && <input style={inputStyle} type="password" placeholder="New Password (optional)" onChange={handleChange} name="password" />}
        {isEditing ? (
          <button style={buttonStyle} onClick={() => {}}>Save</button> // Placeholder for save functionality
        ) : (
          <button style={buttonStyle} onClick={handleEditToggle}>Edit</button>
        )}
        <button style={logOutButtonStyle} onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Profile;
