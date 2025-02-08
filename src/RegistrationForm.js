import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const RegistrationForm = () => {
    const [participants, setParticipants] = useState([]); // Stores participant IDs and names
    const [registration, setRegistration] = useState({
        registration_id: '',
        participant_id: '',
        name: '',
        contact: '',
        registration_date: '',
        attendence_status: '',
    });

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const { data, error } = await supabase
                    .from('participant')
                    .select('participant_id, participant_name');
                
                if (error) throw error;
                setParticipants(data);
            } catch (error) {
                console.error('Error fetching participants:', error.message);
            }
        };
        fetchParticipants();
    }, []);

    // Generate registration ID
    const generateRegistrationId = () => {
        return 'r' + Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistration((prevRegistration) => ({
            ...prevRegistration,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const registration_id = generateRegistrationId(); // Generate new ID

            const { data, error } = await supabase
                .from('registration')
                .insert([{
                    registration_id,
                    participant_id: registration.participant_id,
                    name: registration.name,
                    contact: registration.contact,
                    registration_date: registration.registration_date,
                    attendence_status: registration.attendence_status,
                }]);
    
            if (error) throw error;
    
            // Reset form if successful
            setRegistration({
                registration_id: '',
                participant_id: '',
                name: '',
                contact: '',
                registration_date: '',
                attendence_status: '',
            });
    
            console.log('Registration submitted:', data);
        } catch (error) {
            console.error('Error submitting registration:', error.message);
        }
    };
    
    return (
        <div>
            <h2>Add Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="participant_id">Participant ID:</label>
                    <select
                        id="participant_id"
                        name="participant_id"
                        value={registration.participant_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Participant</option>
                        {participants.map((participant) => (
                            <option key={participant.participant_id} value={participant.participant_id}>
                                {participant.participant_id} - {participant.participant_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={registration.name}
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
                        value={registration.contact}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="registration_date">Registration Date:</label>
                    <input
                        type="datetime-local"
                        id="registration_date"
                        name="registration_date"
                        value={registration.registration_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="attendence_status">Attendance Status:</label>
                    <input
                        type="text"
                        id="attendence_status"
                        name="attendence_status"
                        value={registration.attendence_status}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Registration</button>
            </form>
        </div>
    );
};

export default RegistrationForm;


