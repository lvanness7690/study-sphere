
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/login', { email, password });
            const token = response.data.token;
            // Store token in local storage
            localStorage.setItem('token', token);
            // Update authentication status
            setIsAuthenticated(true);
            // Redirect to main page
            history.push('/main');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            {/* Login form */}
        </div>
    );
};

export default LoginPage;
