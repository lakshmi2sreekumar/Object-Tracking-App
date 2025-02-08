import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const OrganizerEvents = ({ participantId }) => {
    const [events, setEvents] = useState([]);
    const [organizerId, setOrganizerId] = useState(null);

    // Step 1: Fetch the organizer_id associated with the logged-in participant
    useEffect(() => {
        const fetchOrganizerId = async () => {
            try {
                const { data, error } = await supabase
                    .from('participant')
                    .select('organizer_id')
                    .eq('participant_id', participantId)
                    .single();

                if (error) throw error;
                
                setOrganizerId(data.organizer_id); // Set the organizer_id

            } catch (error) {
                console.error('Error fetching organizer ID:', error.message);
            }
        };

        fetchOrganizerId();
    }, [participantId]);

    // Step 2: Fetch events based on the organizer_id
    useEffect(() => {
        const fetchEvents = async () => {
            if (!organizerId) return;

            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .eq('organizer_id', organizerId);

                if (error) throw error;

                setEvents(data || []); // Set events for this organizer
            } catch (error) {
                console.error('Error fetching events:', error.message);
            }
        };

        fetchEvents();
    }, [organizerId]);

    return (
        <div>
            <h2>Events for Organizer</h2>
            {events.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Event ID</th>
                            <th>Event Name</th>
                            <th>Contact</th>
                            <th>Organizer ID</th>
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.id}</td>
                                <td>{event.name}</td>
                                <td>{event.contact}</td>
                                <td>{event.organizer_id}</td>
                                {/* Add more columns as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No events found for this organizer.</p>
            )}
        </div>
    );
};

export default OrganizerEvents;
