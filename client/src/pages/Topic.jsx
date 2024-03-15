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
    <div style={{ textAlign: 'center', margin: '0 auto', maxWidth: '800px', padding: '20px' }}>
      <h2>{topic.title}</h2>
      <p>{topic.description}</p>
      <div>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id}>
              <p>{post.content}</p>
              {/* Render other post details here */}
            </div>
          ))
        ) : (
          <p>No posts found for this topic.</p>
        )}
      </div>
    </div>
  );
};

export default Topic;
