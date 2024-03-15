// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Topic from "./pages/Topic";
import Welcome from "./pages/Welcome"; // Make sure the import path is correct based on your file structure

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar onLoginClick={() => setIsAuthModalOpen(true)} />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        <Routes>
          {/* Set Welcome as the default route */}
          <Route path="/" element={<Welcome onLoginClick={() => setIsAuthModalOpen(true)} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/topic/:topicId" element={<Topic />} />
          {/* You can add more routes as needed */}
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
