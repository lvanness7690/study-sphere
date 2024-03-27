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
    borderRadius: '10px',
    width: '50%',
    maxWidth: '800px',
    height: '70%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
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
    width: '100%',
  };

  const commentSectionStyle = {
    maxHeight: '300px', // Set maximum height for comments section
    overflowY: 'auto', // Add vertical scrollbar when content exceeds maxHeight
  };

  const commentStyle = {
    background: '#f9f9f9',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  };

  return (
    <div style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span className="close" onClick={closeModal} style={{ cursor: 'pointer', alignSelf: 'flex-end', fontSize: '24px' }}>
          &times;
        </span>
        <h2 style={{ textAlign: 'center' }}>Discussion</h2>
        <div className="post" style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 'bold' }}>{post.content}</p>
          <p style={{ fontSize: '14px' }}>By: {post.author}</p>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={inputStyle}
          placeholder="Add your comment..."
          rows={4}
        ></textarea>
        <button style={buttonStyle} onClick={(e) => handleCommentSubmit(e)}>
          Submit
        </button>
        {/* Comments Section */}
        <div style={commentSectionStyle}>
          {/* Render comments */}
          {commentData &&
            commentData.commentsByPost.map((comment, index) => (
              <div key={index} style={commentStyle}>
                <p>{comment.content}</p>
                <p style={{ fontStyle: 'italic', fontSize: '12px' }}>By: {comment.author}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Discussion;