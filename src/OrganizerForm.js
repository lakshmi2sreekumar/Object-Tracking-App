import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const OrganizerForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: ''
    });
    const [message, setMessage] = useState(''); // For success message display

    // Function to generate unique organizer ID
    const generateOrganizerId = () => {
        return 'o' + Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    // Function to generate a username from the organizer's name
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
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Generate organizer ID, username, and password
        const organizer_id = generateOrganizerId();
        const username = generateUsername(formData.name);
        const password = generatePassword();

        try {
            // Insert into 'organizer' table
            const { data: organizerData, error: organizerError } = await supabase
                .from('organizer')
                .insert([{ id: organizer_id, ...formData }]);

            if (organizerError) throw organizerError;

            // Insert credentials into 'Login' table
            const { data: loginData, error: loginError } = await supabase
                .from('Login')
                .insert([{ organizer_id, username, password }]);

            if (loginError) throw loginError;

            // Display success message
            setMessage(`Organizer added successfully with ID: ${organizer_id}, Username: ${username}, Password: ${password}`);

            // Optionally reset the form
            setFormData({
                name: '',
                contact: '',
                email: ''
            });
        } catch (error) {
            console.error('Error adding organizer:', error.message);
            setMessage('An error occurred while adding the organizer.');
        }
    };

    return (
        <div>
            <h2>Create Organizer</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Organizer Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contact">Contact:</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
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
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Organizer</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>} {/* Display success message */}
        </div>
    );
};

export default OrganizerForm;



