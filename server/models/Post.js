// server/models/Post.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  topic: {
    type: Schema.Types.ObjectId,
    ref: 'Topic',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
