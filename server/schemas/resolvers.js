// server/schemas/resolvers.js

const { User, Topic, Post, Comment } = require('../models'); // Corrected the import path
const { signToken, AuthenticationError } = require('../utils/auth'); // Corrected the import path

const resolvers = {
  Query: {
    // Query to get all topics
    topics: async () => {
      return Topic.find();
    },

    // Query to get a single topic by ID
    topic: async (_, { topicId }) => {
      return Topic.findById(topicId);
    },
  },

  Mutation: {
    // Mutation to add a new user
    registerUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    // Mutation to authenticate and log in user
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const correctPassword = await user.isValidPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Mutation to add a new topic
    addTopic: async (_, { title, description }) => {
      const topic = await Topic.create({ title, description });
      return topic;
    },

    // Mutation to add a new post to a topic
    addPost: async (_, { topicId, content }) => {
      const post = await Post.create({ topic: topicId, content });
      return post;
    },

    // Mutation to add a new comment to a post
    addComment: async (_, { postId, content }) => {
      const comment = await Comment.create({ post: postId, content });
      return comment;
    },
  },
};

module.exports = resolvers;
