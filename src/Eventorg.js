import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const EventsList = ({ loggedInOrganizerId }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .eq('organizer_id', loggedInOrganizerId);

                if (error) throw error;
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error.message);
            }
        };

        fetchEvents();
    }, [loggedInOrganizerId]);

    return (
        <div>
            <h2>Your Events</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <h3>{event.name}</h3>
                        <p>Event ID: {event.id}</p>
                        <p>Date: {new Date(event.date).toLocaleString()}</p>
                        <p>Location: {event.location}</p>
                        <p>Description: {event.description}</p>
                        <p>Organizer ID: {event.organizer_id}</p>
                        <p>Type: {event.type}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsList;
