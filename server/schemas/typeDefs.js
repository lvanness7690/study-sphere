const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    topics: [Topic]!
    topic(topicId: ID!): Topic!
    postsByTopic(topicId: ID!): [Post]!  # Added to fetch posts by topic
    commentsByPost(postId: ID!): [Comment]!  # Added to fetch comments by post
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): AuthPayload!
    loginUser(email: String!, password: String!): AuthPayload!
    addTopic(title: String!, description: String!): Topic!
    addPost(topicId: ID!, content: String!): Post!
    addComment(postId: ID!, content: String!): Comment!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String! @deprecated(reason: "This field should not be accessible via GraphQL queries.")
  }

  type Topic {
    id: ID!
    title: String!
    description: String!
    imageUrl: String!
    posts: [Post]!  # Assuming you might want to access posts directly from a topic
  }

  type Post {
    id: ID!
    topic: Topic!
    content: String!
    comments: [Comment]!  # Assuming you might want to access comments directly from a post
  }

  type Comment {
    id: ID!
    post: Post!
    content: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;