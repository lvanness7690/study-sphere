// server/models/Topic.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const topicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: { // Added this line
    type: String,
    required: true, // Set to false if the imageUrl is not mandatory
  },
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
