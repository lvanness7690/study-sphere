import { gql } from '@apollo/client';

export const GET_TOPICS = gql`
  query GetTopics {
    topics {
      id
      title
      description
      imageUrl
    }
  }
`;

export const GET_TOPIC_BY_ID = gql`
  query GetTopicById($topicId: ID!) {
    topic(topicId: $topicId) {
      id
      title
      description
    }
  }
`;

// Newly added query
export const GET_POSTS_BY_TOPIC = gql`
  query GetPostsByTopic($topicId: ID!) {
    postsByTopic(topicId: $topicId) {
      id
      content
      # Add any other post fields you need
    }
  }
`;