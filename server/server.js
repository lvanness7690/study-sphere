require('dotenv').config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const app = express();

// Dynamically set the MongoDB URI based on the environment
const mongoURI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/studySphereDataBase';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to MongoDB at ${mongoURI}`))
  .catch(err => console.error('MongoDB connection error:', err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// PORT is obtained from process.env.PORT with a fallback to 3001 if not set
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve client/build as static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startApolloServer();
