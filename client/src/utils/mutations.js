import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const ADD_TOPIC = gql`
  mutation AddTopic($title: String!, $description: String!) {
    addTopic(title: $title, description: $description) {
      id
      title
      description
      facts
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($topicId: ID!, $content: String!) {
    addPost(topicId: $topicId, content: $content) {
      id
      content
      topic {
        id
        title
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $content: String!) {
    addComment(postId: $postId, content: $content) {
      id
      content
      post {
        id
        content
      }
    }
  }
`;