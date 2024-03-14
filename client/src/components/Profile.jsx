import React, { useState } from 'react';

const Profile = ({ isOpen, onClose, user, onSave, onLogOut }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    onSave(editedUser);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

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
  };

  const modalContentStyle = {
    padding: '20px',
    background: '#fff',
    borderRadius: '5px',
    width: '30%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px', // Increased gap for better spacing
  };

  const inputStyle = {
    width: '80%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

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
    marginTop: '10px', // Ensure it's visually separated from other content
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <span className="close" onClick={onClose} style={{ cursor: 'pointer', alignSelf: 'flex-end', fontSize: '20px' }}>&times;</span>
        <h2>Profile</h2>
        <input style={inputStyle} type="text" placeholder="Name" value={isEditing ? editedUser.name : user.name} onChange={handleChange} name="name" disabled={!isEditing} />
        <input style={inputStyle} type="email" placeholder="Email" value={isEditing ? editedUser.email : user.email} onChange={handleChange} name="email" disabled={!isEditing} />
        <input style={inputStyle} type="password" placeholder="Password" value={isEditing ? editedUser.password : user.password} onChange={handleChange} name="password" disabled={!isEditing} />
        {isEditing ? (
          <button style={buttonStyle} onClick={handleSave}>Save</button>
        ) : (
          <button style={buttonStyle} onClick={handleEditToggle}>Edit</button>
        )}
        <button style={logOutButtonStyle} onClick={onLogOut}>Log Out</button>
      </div>
    </div>
  );
};

export default Profile;
