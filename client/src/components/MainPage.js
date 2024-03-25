import React from 'react';

const MainPage = () => {
    const handleLogout = () => {
        // Remove token from local storage
        localStorage.removeItem('token');
        // Update authentication status
        setIsAuthenticated(false);
        // Redirect to login page
        history.push('/login');
    };

    return (
        <div>
            {/* Main page content */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default MainPage;
