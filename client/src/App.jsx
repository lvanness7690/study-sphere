import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Topic from "./pages/Topic";
import Welcome from "./pages/Welcome";
import Profile from "./components/Profile";

// Setting up Apollo Client
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
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // State to control the visibility of the Profile modal


  // Handler to toggle the AuthModal visibility
  const toggleAuthModal = () => {
    setIsAuthModalOpen(!isAuthModalOpen);
  };

  // Handler to open the Profile modal
  const handleProfileOpen = () => {
    setIsProfileModalOpen(true);
  };

  // Handler to simulate user logout
  const handleLogOut = () => {
    setIsProfileModalOpen(false); // Close Profile modal if open
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar 
          onLoginClick={toggleAuthModal} 
          onProfileClick={handleProfileOpen} 
        />
        <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
        <Profile 
          isOpen={isProfileModalOpen} 
          onClose={() => setIsProfileModalOpen(false)} 
          onLogOut={handleLogOut} 
        />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/topic/:topicId" element={<Topic />} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
