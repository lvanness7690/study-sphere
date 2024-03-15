import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_TOPIC_BY_ID, GET_POSTS_BY_TOPIC } from '../utils/queries';

const Topic = () => {
  const { topicId } = useParams();
  const { data: topicData, loading: topicLoading, error: topicError } = useQuery(GET_TOPIC_BY_ID, {
    variables: { topicId },
  });
  const { data: postsData, loading: postsLoading, error: postsError } = useQuery(GET_POSTS_BY_TOPIC, {
    variables: { topicId },
  });

  if (topicLoading || postsLoading) return <p>Loading...</p>;
  if (topicError) return <p>Error loading topic: {topicError.message}</p>;
  if (postsError) return <p>Error loading posts: {postsError.message}</p>;

  const { topic } = topicData;
  const posts = postsData.postsByTopic;

  return (
    <div style={styles.container}>
      <h2>{topic.title}</h2>
      <p>{topic.description}</p>
      <div style={styles.postsContainer}>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={styles.post}>
              <p>{post.content}</p>
              <button style={styles.commentButton}>Comment</button>
            </div>
          ))
        ) : (
          <p>No posts found for this topic.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    margin: '0 auto',
    maxWidth: '800px',
    padding: '20px',
  },
  postsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  post: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    maxWidth: '600px',
  },
  commentButton: {
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default Topic;
