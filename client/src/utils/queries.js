import { gql } from '@apollo/client';

export const GET_TOPICS = gql`
  query GetTopics {
    topics {
      id
      title
      description
      imageUrl
      facts
    }
  }
`;

export const GET_TOPIC_BY_ID = gql`
  query GetTopicById($topicId: ID!) {
    topic(topicId: $topicId) {
      id
      title
      description
      imageUrl
      facts
    }
  }
`;

// Newly added query
export const GET_POSTS_BY_TOPIC = gql`
  query GetPostsByTopic($topicId: ID!) {
    postsByTopic(topicId: $topicId) {
      id
      content
    }
  }
`;

export const GET_COMMENTS_BY_POST_ID = gql`
  query GetCommentsByPostId($postId: ID!) {
    commentsByPost(postId: $postId) {
      id
      content
    }
  }
`;