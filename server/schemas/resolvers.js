const { User, Topic, Post, Comment } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    topics: async () => Topic.find(),
    topic: async (_, { topicId }) => Topic.findById(topicId),
    postsByTopic: async (_, { topicId }) => Post.find({ topic: topicId }), // Fetch posts by topic ID
    commentsByPost: async (_, { postId }) => Comment.find({ post: postId }), // Fetch comments by post ID
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
      const post = await Post.create({ topic: topicId, content });
      // Optional: Update the topic to include this post, if your schema requires
      return post;
    },

    addComment: async (_, { postId, content }) => {
      const comment = await Comment.create({ post: postId, content });
      // Optional: Update the post to include this comment, if your schema requires
      return comment;
    },
  },
};

module.exports = resolvers;