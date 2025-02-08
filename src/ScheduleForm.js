// src/components/ScheduleForm.js

import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const ScheduleForm = () => {
    const [schedules, setSchedules] = useState([]); // To track schedules and generate ID
    const [events, setEvents] = useState([]); // For event_id dropdown
    const [venues, setVenues] = useState([]); // For venue_id dropdown
    const [schedule, setSchedule] = useState({
        event_id: '',
        venue_id: '',
        start_time: '',
        end_time: '',
        location: ''
    });

    useEffect(() => {
        // Fetch events for event_id dropdown
        const fetchEvents = async () => {
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('id, name');
                if (error) throw error;
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error.message);
            }
        };

        // Fetch venues for venue_id dropdown
        const fetchVenues = async () => {
            try {
                const { data, error } = await supabase
                    .from('venue')
                    .select('venue_id, venue_name');
                if (error) throw error;
                setVenues(data);
            } catch (error) {
                console.error('Error fetching venues:', error.message);
            }
        };

        // Fetch existing schedules for generating ID
        const fetchSchedules = async () => {
            try {
                const { data, error } = await supabase
                    .from('schedule')
                    .select('*');
                if (error) throw error;
                setSchedules(data);
            } catch (error) {
                console.error('Error fetching schedules:', error.message);
            }
        };

        fetchEvents();
        fetchVenues();
        fetchSchedules();
    }, []);

    // Generate a new schedule_id
    const generateNewScheduleId = () => {
        const prefix = 's'; // Prefix for schedule ID
        const lastScheduleId = schedules.length > 0 ? schedules[schedules.length - 1].schedule_id : null;

        if (lastScheduleId) {
            const lastIdNumber = parseInt(lastScheduleId.slice(1), 10);
            return prefix + (lastIdNumber + 1).toString();
        }
        return prefix + '1'; // Start with s1 if no schedules exist
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const schedule_id = generateNewScheduleId();

            const { data, error } = await supabase
                .from('schedule')
                .insert([{
                    schedule_id: schedule_id,
                    event_id: schedule.event_id,
                    venue_id: schedule.venue_id,
                    start_time: schedule.start_time,
                    end_time: schedule.end_time,
                    location: schedule.location,
                }]);
    
            if (error) throw error;
    
            console.log('Schedule submitted:', data); // Log data for confirmation
    
            // Reset the form if successful
            setSchedule({
                event_id: '',
                venue_id: '',
                start_time: '',
                end_time: '',
                location: ''
            });

            // Refresh schedules after adding new entry
            const { data: updatedSchedules, error: fetchError } = await supabase
                .from('schedule')
                .select('*');
            if (fetchError) throw fetchError;
            setSchedules(updatedSchedules);
        } catch (error) {
            console.error('Error submitting schedule:', error.message);
        }
    };

    return (
        <div>
            <h2>Add Schedule</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="event_id">Event:</label>
                    <select
                        id="event_id"
                        name="event_id"
                        value={schedule.event_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Event</option>
                        {events.map(event => (
                            <option key={event.id} value={event.id}>{event.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="venue_id">Venue:</label>
                    <select
                        id="venue_id"
                        name="venue_id"
                        value={schedule.venue_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Venue</option>
                        {venues.map(venue => (
                            <option key={venue.venue_id} value={venue.venue_id}>{venue.venue_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="start_time">Start Time:</label>
                    <input
                        type="datetime-local"
                        id="start_time"
                        name="start_time"
                        value={schedule.start_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="end_time">End Time:</label>
                    <input
                        type="datetime-local"
                        id="end_time"
                        name="end_time"
                        value={schedule.end_time}
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
                        value={schedule.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Schedule</button>
            </form>
        </div>
    );
};

export default ScheduleForm;

