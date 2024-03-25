

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from './LoginPage';
import MainPage from './MainPage';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <ProtectedRoute
                    path="/main"
                    component={MainPage}
                    isAuthenticated={isAuthenticated}
                />
            </Switch>
        </Router>
    );
};

export default App;
