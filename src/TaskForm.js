// src/components/TaskForm.js

import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const TaskForm = () => {
    const [task, setTask] = useState({
        event_id: '',
        task_description: '', // Add task_description here
        assigned_to: ''
    });
    const [events, setEvents] = useState([]);
    const [participants, setParticipants] = useState([]);

    // Fetch event IDs and names
    useEffect(() => {
        const fetchEvents = async () => {
            const { data, error } = await supabase
                .from('events')
                .select('id, name');
            if (error) {
                console.error('Error fetching events:', error.message);
            } else {
                setEvents(data);
            }
        };
        fetchEvents();
    }, []);

    // Fetch participant IDs and names
    useEffect(() => {
        const fetchParticipants = async () => {
            const { data, error } = await supabase
                .from('participant')
                .select('participant_id, participant_name');
            if (error) {
                console.error('Error fetching participants:', error.message);
            } else {
                setParticipants(data);
            }
        };
        fetchParticipants();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Generate task_id automatically
        const generatedTaskId = `t${Date.now()}`; // Unique ID based on timestamp

        try {
            const { data, error } = await supabase
                .from('task')
                .insert([{
                    task_id: generatedTaskId,
                    event_id: task.event_id,
                    task_description: task.task_description, // Include task_description in the submission
                    assigned_to: task.assigned_to,
                }]);
    
            if (error) throw error;
    
            console.log('Task submitted:', data);

            // Reset form after submission
            setTask({
                event_id: '',
                task_description: '',
                assigned_to: '',
            });
        } catch (error) {
            console.error('Error submitting task:', error.message);
        }
    };

    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="event_id">Event:</label>
                    <select
                        id="event_id"
                        name="event_id"
                        value={task.event_id}
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
                    <label htmlFor="task_description">Task Description:</label>
                    <input
                        type="text"
                        id="task_description"
                        name="task_description"
                        value={task.task_description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="assigned_to">Assigned To:</label>
                    <select
                        id="assigned_to"
                        name="assigned_to"
                        value={task.assigned_to}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Participant</option>
                        {participants.map((participant) => (
                            <option key={participant.participant_id} value={participant.participant_id}>
                                {participant.participant_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default TaskForm;

