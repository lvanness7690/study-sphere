// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './utils/AuthContext';
import Home from './pages/Home';
import Topic from './pages/Topic';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/topic/:id" component={Topic} />
            <Route path="/profile" component={Profile} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
