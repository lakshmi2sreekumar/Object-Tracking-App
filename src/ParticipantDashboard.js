// src/components/OrganizerDashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ParticipantDashboard = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Participant Dashboard</h2>
            <button onClick={() => navigate('/add-participant')}>Add participant</button>
            <button onClick={() => navigate('/display-participant')}>Display participant Table</button>
            <button onClick={() => navigate('/delete-participant')}>Delete participant</button>
        </div>
    );
};

export default ParticipantDashboard;