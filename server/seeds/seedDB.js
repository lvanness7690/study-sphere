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
        description: 'MongoDB is a NoSQL, document-oriented database known for flexibility, scalability, and performance.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png',
        facts: [
          'MongoDB stores data in flexible, JSON-like documents.',
          'It is designed to facilitate powerful ad hoc queries.',
          'MongoDB uses dynamic schemas, making it easier to evolve your data model.',
          'It offers automatic sharding for horizontal scalability.',
          'Supports replication for high availability.',
          'Provides full index support, including on inner arrays.',
          'MongoDB Atlas is MongoDB’s fully-managed cloud service.',
          'Supports rich queries including document, field, range queries, and regular expression searches.',
          'Allows for server-side JavaScript execution.',
          'Employs a powerful aggregation framework for data analysis.',
        ],
      },
      { 
        title: 'Express',
        description: 'Express is a Node.js web application framework that simplifies server-side development.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png',
        facts: [
          'Express is a minimal and flexible Node.js web application framework.',
          'It is designed for building web applications and APIs.',
          'Express simplifies routing, middleware, handling requests, and views.',
          'It is unopinionated, allowing developers to choose the best libraries to work with.',
          'Supports the creation of RESTful web services.',
          'Highly performant due to its minimalistic nature.',
          'Has a robust set of features for web and mobile applications.',
          'Integrates seamlessly with databases like MongoDB, PostgreSQL, and more.',
          'The Express Generator tool scaffolds a new application quickly.',
          'Widely used by companies like IBM, Uber, and Twitter.',
        ],
      },
      { 
        title: 'React',
        description: 'React is a front-end library for building user interfaces with reusable components.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png',
        facts: [
          'React was created by Jordan Walke, a software engineer at Facebook.',
          'It was initially released in May 2013.',
          'Utilizes a virtual DOM to improve app performance.',
          'Supports server-side rendering for SEO benefits.',
          'Follows a component-based architecture.',
          'One-way data binding gives more control throughout the application.',
          'An open-source project maintained by Facebook and the community.',
          'Can be used with other libraries or frameworks, like Angular or Vue.',
          'React Native, derived from React, allows for native mobile app development.',
          'The React ecosystem includes tools like Create React App and Next.js.',
        ],
      },
      { 
        title: 'Node',
        description: 'Node.js is a JavaScript runtime for server-side development.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png',
        facts: [
          'Node.js is built on Chrome\'s V8 JavaScript engine.',
          'It allows the execution of JavaScript code server-side.',
          'Node.js uses an event-driven, non-blocking I/O model.',
          'npm, Node.js’ package ecosystem, is the largest ecosystem of open source libraries.',
          'Node.js can be used for building scalable network applications.',
          'It is particularly well-suited for real-time applications, like live chats and gaming.',
          'Supports various databases, both SQL and NoSQL.',
          'Node.js applications can run on various platforms (Windows, Linux, Unix, Mac OS X, etc.).',
          'It encourages the development of full-stack applications (JavaScript both client and server side).',
          'Major companies like Netflix, PayPal, and LinkedIn use Node.js for part of their stack.',
        ],
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
