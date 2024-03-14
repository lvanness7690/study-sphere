// server/schemas/resolvers.js
const { User, Topic, Post, Comment } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    topics: async () => Topic.find(),
    topic: async (_, { topicId }) => Topic.findById(topicId),
  },

  Mutation: {
    registerUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isValidPassword(password))) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    addTopic: async (_, { title, description }) => {
      return Topic.create({ title, description });
    },

    addPost: async (_, { topicId, content }) => {
      return Post.create({ topic: topicId, content });
    },

    addComment: async (_, { postId, content }) => {
      return Comment.create({ post: postId, content });
    },
  },
};

module.exports = resolvers;
