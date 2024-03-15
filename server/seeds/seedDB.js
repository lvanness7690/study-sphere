const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User, Topic, Post, Comment } = require('../models');

// Replace "myDatabase" with the name of your actual database
const dbURI = 'mongodb://localhost:27017/myDatabase';

const seedDB = async () => {
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    console.log("Connected to MongoDB.");

    await User.deleteMany({});
    await Topic.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    const topics = [
      { title: 'MongoDB', description: 'MongoDB is a NoSQL database.' },
      { title: 'Express', description: 'Express is a web application framework for Node.js.' },
      { title: 'React', description: 'React is a front-end JavaScript library for building user interfaces.' },
      { title: 'Node', description: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.' },
    ];

    await Topic.insertMany(topics);
    console.log("Topics seeded.");

    const users = [
      { username: 'Alice', email: 'alice@example.com', password: 'securepassword123' },
      { username: 'Bob', email: 'bob@example.com', password: 'securepassword123' },
      { username: 'Charlie', email: 'charlie@example.com', password: 'securepassword123' },
      { username: 'Dana', email: 'dana@example.com', password: 'securepassword123' },
      { username: 'Eli', email: 'eli@example.com', password: 'securepassword123' },
      { username: 'Fiona', email: 'fiona@example.com', password: 'securepassword123' },
      { username: 'George', email: 'george@example.com', password: 'securepassword123' },
      { username: 'Hannah', email: 'hannah@example.com', password: 'securepassword123' },
      { username: 'Ivan', email: 'ivan@example.com', password: 'securepassword123' },
      { username: 'Jasmine', email: 'jasmine@example.com', password: 'securepassword123' },
    ];

    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    const createdUsers = await User.insertMany(users);
    console.log("Users seeded.");

    const createdTopics = await Topic.find({});

    for (const user of createdUsers) {
      for (const topic of createdTopics) {
        const post = await Post.create({
          topic: topic._id,
          content: `A fascinating post about ${topic.title} by ${user.username}`,
          user: user._id,
        });

        await Comment.create({
          post: post._id,
          content: `A thoughtful comment on ${user.username}'s post about ${topic.title}`,
        });
      }
    }

    console.log("Posts and Comments seeded.");
    mongoose.disconnect();
  } catch (error) {
    console.error('Failed to seed database:', error);
    mongoose.disconnect();
  }
};

seedDB();
