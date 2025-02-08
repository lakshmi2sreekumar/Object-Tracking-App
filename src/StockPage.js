import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';

const StockPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session data (if applicable) and navigate to the login page
        navigate('/login');
    };

    return (
        <div>

            <h2>Stock Page</h2>
            <button onClick={() => navigate('/vendor')}>Vendor</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default StockPage;
