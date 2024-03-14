// Post.js
import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {/* Display comments */}
    </div>
  );
};

export default Post;
