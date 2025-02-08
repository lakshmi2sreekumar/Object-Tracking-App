// src/components/VenueForm.js

import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const VenueForm = () => {
    const [venue, setVenue] = useState({
        venue_id: '',
        venue_name: '',
        location: '',
        capacity: '',
        is_available: false,
    });

    const [venues, setVenues] = useState([]); // For tracking existing venues to generate new ID

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const { data, error } = await supabase
                    .from('venue')
                    .select('venue_id');

                if (error) throw error;
                setVenues(data);
            } catch (error) {
                console.error('Error fetching venues:', error.message);
            }
        };

        fetchVenues();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVenue((prevVenue) => ({
            ...prevVenue,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Generate a new venue ID
            const venue_id = generateNewVenueId();

            const { data, error } = await supabase
                .from('venue')
                .insert([{
                    venue_id,
                    venue_name: venue.venue_name,
                    location: venue.location,
                    capacity: venue.capacity,
                    is_available: venue.is_available,
                }]);

            if (error) throw error;

            console.log('Venue submitted:', data);

            // Reset form
            setVenue({
                venue_id: '',
                venue_name: '',
                location: '',
                capacity: '',
                is_available: false,
            });
        } catch (error) {
            console.error('Error submitting venue:', error.message);
        }
    };

    const generateNewVenueId = () => {
        const prefix = 'v'; // Prefix for venue ID
        const lastVenueId = venues.length > 0 ? venues[venues.length - 1].venue_id : null;

        if (lastVenueId) {
            const lastIdNumber = parseInt(lastVenueId.slice(1), 10);
            return prefix + (lastIdNumber + 1).toString();
        }

        return prefix + '1'; // Start with v1 if no venues exist
    };

    return (
        <div>
            <h2>Add Venue</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="venue_name">Venue Name:</label>
                    <input
                        type="text"
                        id="venue_name"
                        name="venue_name"
                        value={venue.venue_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={venue.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="capacity">Capacity:</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={venue.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="is_available">Is Available:</label>
                    <input
                        type="checkbox"
                        id="is_available"
                        name="is_available"
                        checked={venue.is_available}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Venue</button>
            </form>
        </div>
    );
};

export default VenueForm;

