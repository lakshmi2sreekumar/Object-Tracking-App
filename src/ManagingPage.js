import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

const ManagingPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any stored session (if using local storage/session storage) and navigate to login page
        // Example: localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div>
            <h2>Managing Page</h2>
            <button onClick={() => navigate('/organizer')}>Organizer Dashboard</button>
            <button onClick={() => navigate('/participant')}>Participant Dashboard</button>
            <button onClick={() => navigate('/event-list')}>Events</button>
            <button onClick={handleLogout}>Logout</button>

        </div>
    );
};

export default ManagingPage;




