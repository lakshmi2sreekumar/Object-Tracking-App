// src/components/DisplayOrganizers.js
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const DisplayOrganizers = () => {
    const [organizers, setOrganizers] = useState([]);
    const [loginData, setLoginData] = useState([]);

    useEffect(() => {
        const fetchOrganizers = async () => {
            const { data, error } = await supabase.from('organizer').select('*');
            if (error) {
                console.error('Error fetching organizers:', error);
                return;
            }
            setOrganizers(data || []);
        };

        const fetchLoginData = async () => {
            const { data, error } = await supabase.from('Login').select('*');
            if (error) {
                console.error('Error fetching login data:', error);
                return;
            }
            setLoginData(data || []);
        };

        fetchOrganizers();
        fetchLoginData();
    }, []);

    return (
        <div>
            <h2>Organizer List</h2>
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
                    {organizers.map((organizer) => (
                        <tr
                            key={organizer.id}
                            style={{
                                color: loginData.some(login => login.organizer_id === organizer.id)
                                    ? 'black'
                                    : 'red'
                            }}
                        >
                            <td>{organizer.id}</td>
                            <td>{organizer.name}</td>
                            <td>{organizer.contact}</td>
                            <td>{organizer.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayOrganizers;



