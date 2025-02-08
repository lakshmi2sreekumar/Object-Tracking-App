// src/components/DisplayOrganizers.js
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const DisplayParticipants = () => {
    const [Participants, setParticipants] = useState([]);
    const [loginData, setLoginData] = useState([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            const { data, error } = await supabase.from('participant').select('*');
            if (error) {
                console.error('Error fetching Participants:', error);
                return;
            }
            setParticipants(data || []);
        };

        const fetchLoginData = async () => {
            const { data, error } = await supabase.from('Login').select('*');
            if (error) {
                console.error('Error fetching login data:', error);
                return;
            }
            setLoginData(data || []);
        };

        fetchParticipants();
        fetchLoginData();
    }, []);

    return (
        <div>
            <h2>Participant List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {Participants.map((participant) => (
                        <tr
                            key={participant.participant_id}
                            style={{
                                color: loginData.some(login => login.organizer_id === participant.participant_id)
                                    ? 'black'
                                    : 'red'
                            }}
                        >
                            <td>{participant.participant_id}</td>
                            <td>{participant.name}</td>
                            <td>{participant.phone_number}</td>
                            <td>{participant.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayParticipants;