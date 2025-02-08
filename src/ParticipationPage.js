import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';

const ParticipantPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div>
            <h2>Participant Page</h2>
            <button onClick={() => navigate('/resource')}>Resource</button>
            <button onClick={() => navigate('/event-list')}>Event List</button>
            <button onClick={() => navigate('/event-vendor')}>Event-Vendor</button>
            <button onClick={() => navigate('/Displayvendor')}>Vendor List</button>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ParticipantPage;
