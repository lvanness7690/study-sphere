import React, { useState } from 'react';
import {useMutation, useQuery} from '@apollo/client'
import {ADD_COMMENT} from '../utils/mutations'
import {GET_COMMENTS_BY_POST_ID} from '../utils/queries'

const Discussion = ({ post, closeModal }) => {
  const postId = post.id;

  const { data: commentData, loading: commentLoading, error: commentError, refetch } = useQuery(GET_COMMENTS_BY_POST_ID, {
    variables: { postId },
  });

  const [addComment] = useMutation(ADD_COMMENT);
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment({
        variables: {
          content: comment,
          postId: postId
        }
      });
       // Refetch user data to update saved books
       await refetch();
      // Reset the form fields after successful submission
      setComment('');
    } catch (error) {
      // Handle any errors from the mutation
      console.error('Error adding topic:', error);
    }
  };

  if (commentLoading) return <p>Loading...</p>;
  if (commentError) return <p>Error loading topic: {commentError.message}</p>;

  const modalStyle = {
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1001,
  };

  const modalContentStyle = {
    padding: '20px',
    background: '#fff',
    borderRadius: '5px',
    width: '30%',
    maxWidth: '500px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  };

  const inputStyle = {
    width: '80%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '80%',
  };

  return (
    <div style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span className="close" onClick={closeModal} style={{ cursor: 'pointer', alignSelf: 'flex-end', fontSize: '20px' }}>&times;</span>
        <h2>Discussion</h2>
        <div className="post">
          <p style={{ fontWeight: 'bold', textAlign: 'center' }}>{post.content}</p>
          <p style={{ fontSize: '14px', textAlign: 'center' }}>By: {post.author}</p>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={inputStyle}
          placeholder="Add your comment..."
          rows={4}
          cols={50}
        ></textarea>
        <button style={buttonStyle} onClick={(e) => handleCommentSubmit(e)}>Submit</button>
        {/* Render comments */}
        {commentData&& commentData.commentsByPost.map((comment, index) => (
          <div key={index} className="comment">
            <p>{comment.content}</p>
            <p>Author: {comment.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discussion;
