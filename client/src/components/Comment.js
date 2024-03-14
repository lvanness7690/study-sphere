// Comment.js
import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p>{comment.text}</p>
      {/* Display user information */}
    </div>
  );
};

export default Comment;
