import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
                .from('Login')
                .select('*')
                .eq('username', username)
                .eq('password', password)
                .single();

            console.log("Supabase response:", data, error);

            if (error || !data) {
                setError("Invalid username or password");
            } else {
                const organizerId = data.organizer_id;
                // Store organizer_id in localStorage
                localStorage.setItem('organizer_id', organizerId);

                // Navigate based on organizer_id prefix
                if (organizerId.startsWith('o')) navigate('/organization');
                else if (organizerId.startsWith('p')) navigate('/participation');
                else if (organizerId.startsWith('m')) navigate('/managing');
                else if (organizerId.startsWith('s')) navigate('/stock');
                else setError("Unrecognized user role");
            }
        } catch (err) {
            console.error('Login error:', err.message);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;

