import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const EventVendorForm = () => {
    const [eventVendor, setEventVendor] = useState({
        event_id: '',
        vendor_id: '',
    });
    const [events, setEvents] = useState([]);
    const [vendors, setVendors] = useState([]);

    // Fetch events for the dropdown list
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('id, name'); // Adjust column names if necessary

                if (error) throw error;
                setEvents(data || []);
            } catch (error) {
                console.error('Error fetching events:', error.message);
            }
        };

        fetchEvents();
    }, []);

    // Fetch vendors for the dropdown list
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const { data, error } = await supabase
                    .from('vendor')
                    .select('vendor_id, vendor_name'); // Adjust column names if necessary

                if (error) throw error;
                setVendors(data || []);
            } catch (error) {
                console.error('Error fetching vendors:', error.message);
            }
        };

        fetchVendors();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventVendor((prevEventVendor) => ({
            ...prevEventVendor,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
                .from('event_has_vendor') // Matches the Supabase table name
                .insert([{
                    event_id: eventVendor.event_id,
                    vendor_id: eventVendor.vendor_id,
                }]);

            if (error) throw error;

            console.log('Event and Vendor linked:', data);

            // Reset the form if successful
            setEventVendor({
                event_id: '',
                vendor_id: '',
            });
        } catch (error) {
            console.error('Error linking event and vendor:', error.message);
        }
    };

    return (
        <div>
            <h2>Link Event with Vendor</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="event_id">Event:</label>
                    <select
                        id="event_id"
                        name="event_id"
                        value={eventVendor.event_id}
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
                <div>
                    <label htmlFor="vendor_id">Vendor:</label>
                    <select
                        id="vendor_id"
                        name="vendor_id"
                        value={eventVendor.vendor_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Vendor</option>
                        {vendors.map((vendor) => (
                            <option key={vendor.vendor_id} value={vendor.vendor_id}>
                                {vendor.vendor_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Link Event and Vendor</button>
            </form>
        </div>
    );
};

export default EventVendorForm;




