import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const ResourceForm = () => {
    const [resource, setResource] = useState({
        resource_name: '',
        resource_type: '',
        quantity: '',
        event_id: '',
    });
    const [events, setEvents] = useState([]);

    // Fetch events for the dropdown list
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('id, name'); // Ensure columns are correctly specified in Supabase

                if (error) throw error;
                setEvents(data || []);
            } catch (error) {
                console.error('Error fetching events:', error.message);
            }
        };

        fetchEvents();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setResource((prevResource) => ({
            ...prevResource,
            [name]: value,
        }));
    };

    // Generate a unique resource_id (e.g., based on timestamp or UUID)
    const generateResourceId = () => `res_${Date.now()}`;

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const resource_id = generateResourceId(); // Generate resource_id

        try {
            const { data, error } = await supabase
                .from('resource')
                .insert([{
                    resource_id: resource_id,
                    resource_name: resource.resource_name,
                    resource_type: resource.resource_type,
                    quantity: resource.quantity,
                    event_id: resource.event_id,
                }]);

            if (error) throw error;

            console.log('Resource submitted:', data);

            // Reset the form if successful
            setResource({
                resource_name: '',
                resource_type: '',
                quantity: '',
                event_id: '',
            });
        } catch (error) {
            console.error('Error submitting resource:', error.message);
        }
    };

    return (
        <div>
            <h2>Add Resource</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="resource_name">Resource Name:</label>
                    <input
                        type="text"
                        id="resource_name"
                        name="resource_name"
                        value={resource.resource_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="resource_type">Resource Type:</label>
                    <input
                        type="text"
                        id="resource_type"
                        name="resource_type"
                        value={resource.resource_type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={resource.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="event_id">Event:</label>
                    <select
                        id="event_id"
                        name="event_id"
                        value={resource.event_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select an Event</option>
                        {events.map((event) => (
                            <option key={event.id} value={event.id}>
                                {event.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Resource</button>
            </form>
        </div>
    );
};

export default ResourceForm;

