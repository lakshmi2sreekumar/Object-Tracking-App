// src/components/DeleteOrganizer.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const DeleteOrganizer = () => {
    const [organizerId, setOrganizerId] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('Login').delete().eq('organizer_id', organizerId);

        if (error) {
            setMessage('Error deleting organizer: ' + error.message);
        } else {
            setMessage('Organizer deleted successfully.');
            setOrganizerId(''); // Clear the input field
        }
    };

    return (
        <div>
            <h2>Delete Organizer</h2>
            <form onSubmit={handleDelete}>
                <input
                    type="text"
                    value={organizerId}
                    onChange={(e) => setOrganizerId(e.target.value)}
                    placeholder="Enter Organizer ID"
                    required
                />
                <button type="submit">Delete Organizer</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default DeleteOrganizer;

