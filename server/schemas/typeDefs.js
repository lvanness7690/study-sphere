// server/schemas/typeDefs.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    topics: [Topic]!
    topic(topicId: ID!): Topic!
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
  }

  type Topic {
    id: ID!
    title: String!
    description: String!
  }

  type Post {
    id: ID!
    topic: Topic!
    content: String!
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
