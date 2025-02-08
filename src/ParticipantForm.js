import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const ParticipantForm = () => {
    const [participant, setParticipant] = useState({
        participant_name: '',
        email: '',
        phone_number: '',
        organizer_id: '', // Add organizer_id to the participant state
    });
    const [message, setMessage] = useState(''); // For success message display
    const [organizers, setOrganizers] = useState([]); // Store organizer data

    // Fetch organizers from the organizer table
    useEffect(() => {
        const fetchOrganizers = async () => {
            const { data, error } = await supabase.from('organizer').select('id, name');
            if (error) {
                console.error('Error fetching organizers:', error);
            } else {
                setOrganizers(data);
            }
        };

        fetchOrganizers();
    }, []);

    // Function to generate unique ID
    const generateParticipantId = () => {
        return 'p' + Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    // Function to generate a username from the name
    const generateUsername = (name) => {
        const baseUsername = name.toLowerCase().replace(/\s+/g, '');
        const randomSuffix = Math.floor(Math.random() * 1000);
        return `${baseUsername}${randomSuffix}`;
    };

    // Function to generate a random password
    const generatePassword = () => {
        return Math.random().toString(36).slice(-8);
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setParticipant((prevParticipant) => ({
            ...prevParticipant,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Generate participant ID, username, and password
        const participant_id = generateParticipantId();
        const username = generateUsername(participant.participant_name);
        const password = generatePassword();

        try {
            // Insert into 'participant' table
            const { data: participantData, error: participantError } = await supabase
                .from('participant')
                .insert([{ participant_id, ...participant }]);

            if (participantError) throw participantError;

            // Insert credentials into 'Login' table
            const { data: loginData, error: loginError } = await supabase
                .from('Login')
                .insert([{ organizer_id: participant_id, username, password }]);

            if (loginError) throw loginError;

            // Display success message
            setMessage(`Participant added successfully with ID: ${participant_id}, Username: ${username}, Password: ${password}`);

            // Optionally reset the form
            setParticipant({
                participant_name: '',
                email: '',
                phone_number: '',
                organizer_id: '', // Reset organizer_id as well
            });
        } catch (error) {
            console.error('Error adding participant:', error.message);
            setMessage('An error occurred while adding the participant.');
        }
    };

    return (
        <div>
            <h2>Add Participant</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="participant_name">Name:</label>
                    <input
                        type="text"
                        id="participant_name"
                        name="participant_name"
                        value={participant.participant_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={participant.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone_number">Phone Number:</label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={participant.phone_number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="organizer_id">Organizer:</label>
                    <select
                        id="organizer_id"
                        name="organizer_id"
                        value={participant.organizer_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select an organizer</option>
                        {organizers.map(organizer => (
                            <option key={organizer.id} value={organizer.id}>
                                {organizer.id} - {organizer.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Participant</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>} {/* Display success message */}
        </div>
    );
};

export default ParticipantForm;




