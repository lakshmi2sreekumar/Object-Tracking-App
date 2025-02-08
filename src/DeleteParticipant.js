// src/components/DeleteOrganizer.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const DeleteParticipant = () => {
    const [ParticipantId, setParticipantId] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('Login').delete().eq('organizer_id', ParticipantId);

        if (error) {
            setMessage('Error deleting Participant: ' + error.message);
        } else {
            setMessage('Participant deleted successfully.');
            setParticipantId(''); // Clear the input field
        }
    };

    return (
        <div>
            <h2>Delete Participant</h2>
            <form onSubmit={handleDelete}>
                <input
                    type="text"
                    value={ParticipantId}
                    onChange={(e) => setParticipantId(e.target.value)}
                    placeholder="Enter Participant ID"
                    required
                />
                <button type="submit">Delete Participant</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default DeleteParticipant;