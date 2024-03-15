require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User, Topic, Post, Comment } = require('../models');

// Get the MongoDB URI from environment variables or use the default local URI
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/studySphereDataBase';

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
      { 
        title: 'MongoDB',
        description: 'MongoDB is a NoSQL, document-oriented database known for flexibility, scalability, and performance, featuring sharding, replication, a rich query language, and indexing.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png'
      },
      { 
        title: 'Express',
        description: 'Express is a Node.js web application framework that simplifies server-side development with features for handling requests, routing, and integrating with other Node.js modules.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png'
      },
      { 
        title: 'React',
        description: 'React is a front-end library for building user interfaces with reusable components, offering efficient rendering through its virtual DOM and component-based architecture.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'
      },
      { 
        title: 'Node',
        description: 'Node.js is a JavaScript runtime for server-side development, featuring a non-blocking, event-driven architecture for building scalable network and real-time applications.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png'
      },
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
