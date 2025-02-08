// src/components/OrganizerDashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizerDashboard = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Organizer Dashboard</h2>
            <button onClick={() => navigate('/add-organizer')}>Add Organizer</button>
            <button onClick={() => navigate('/display-organizer')}>Display Organizer Table</button>
            <button onClick={() => navigate('/delete-organizer')}>Delete Organizer</button>
        </div>
    );
};

export default OrganizerDashboard;
