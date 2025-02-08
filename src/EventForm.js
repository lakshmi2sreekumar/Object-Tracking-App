// src/components/EventForm.js

import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const EventForm = () => {
    const [events, setEvents] = useState([]);
    const [organizers, setOrganizers] = useState([]); // For organizer dropdown
    const [registrations, setRegistrations] = useState([]); // For registration dropdown
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        location: '',
        description: '',
        organizer_id: '',
        type: '',
        registration_id: ''
    });

    useEffect(() => {
        // Fetch organizers
        const fetchOrganizers = async () => {
            try {
                const { data, error } = await supabase
                    .from('organizer')
                    .select('id, name');
                
                if (error) throw error;
                setOrganizers(data);
            } catch (error) {
                console.error('Error fetching organizers:', error.message);
            }
        };

        // Fetch registrations
        const fetchRegistrations = async () => {
            try {
                const { data, error } = await supabase
                    .from('registration')
                    .select('registration_id, name'); // Assume 'name' exists in the registration table
                
                if (error) throw error;
                setRegistrations(data);
            } catch (error) {
                console.error('Error fetching registrations:', error.message);
            }
        };

        fetchOrganizers();
        fetchRegistrations();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Generate a new event ID
            const event_id = generateNewId();

            const { data, error } = await supabase
                .from('events')
                .insert([{ id: event_id, ...formData }]);
    
            if (error) throw error;

            setFormData({
                name: '',
                date: '',
                location: '',
                description: '',
                organizer_id: '',
                type: '',
                registration_id: ''
            });

            // Fetch updated events after creating the new one
            const { data: updatedEvents, error: fetchError } = await supabase
                .from('events')
                .select('*');
    
            if (fetchError) throw fetchError;
            setEvents(updatedEvents);
        } catch (error) {
            console.error('Error creating event:', error.message);
        }
    };

    const generateNewId = () => {
        const prefix = 'e'; // Prefix for event ID
        const lastEventId = events.length > 0 ? events[events.length - 1].id : null;

        if (lastEventId) {
            const lastIdNumber = parseInt(lastEventId.slice(1), 10);
            return prefix + (lastIdNumber + 1).toString();
        }

        return prefix + '1'; // Start with e1 if no events exist
    };

    return (
        <div>
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Event Name" value={formData.name} onChange={handleChange} required />
                <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                
                <select name="organizer_id" value={formData.organizer_id} onChange={handleChange} required>
                    <option value="">Select Organizer</option>
                    {organizers.map(org => (
                        <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                </select>
                
                <select name="registration_id" value={formData.registration_id} onChange={handleChange} required>
                    <option value="">Select Registration</option>
                    {registrations.map(reg => (
                        <option key={reg.registration_id} value={reg.registration_id}>{reg.name}</option>
                    ))}
                </select>

                <input type="text" name="type" placeholder="Event Type" value={formData.type} onChange={handleChange} />
                <button type="submit">Create Event</button>
            </form>

            <h2>Event List</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <h3>{event.name}</h3>
                        <p>Date: {new Date(event.date).toLocaleString()}</p>
                        <p>Location: {event.location}</p>
                        <p>Description: {event.description}</p>
                        <p>Organizer ID: {event.organizer_id}</p>
                        <p>Type: {event.type}</p>
                        <p>Registration ID: {event.registration_id}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventForm;





