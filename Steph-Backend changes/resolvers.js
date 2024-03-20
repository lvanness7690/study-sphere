const { User, Topic, Post, Comment } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    topics: async () => Topic.find(),
    topic: async (_, { topicId }) => Topic.findById(topicId),
  },
  Mutation: {
    registerUser: async (_, { username, email, password }) => {
      // Check if user already exists with the provided email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }
      // Create new user in the database
      const newUser = await User.create({ username, email, password });
      // Generate JWT token for the newly registered user
      const token = signToken(newUser);
      return { token, user: newUser };
    },
    loginUser: async (_, { email, password }) => {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user || !(await user.isValidPassword(password))) {
        throw new AuthenticationError('Incorrect credentials');
      }
      // Generate JWT token for the authenticated user
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
