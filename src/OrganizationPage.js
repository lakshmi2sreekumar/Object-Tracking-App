import React from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';

const OrganizationPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any session data and navigate to the login page
        navigate('/login');
    };

    return (
        <div>
            
            <h2>Organization Page</h2>
            <button onClick={() => navigate('/event')}>Event</button>
            <button onClick={() => navigate('/registration')}>Registration</button>
            <button onClick={() => navigate('/venue')}>Venue</button>
            <button onClick={() => navigate('/schedule')}>Schedule</button>
            <button onClick={() => navigate('/task')}>Task</button>
            <button onClick={() => navigate('/event-list')}>EventList</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default OrganizationPage;

