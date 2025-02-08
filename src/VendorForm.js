// src/components/VendorForm.js

import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import axios from 'axios';

const VendorForm = () => {
    const [vendor, setVendor] = useState({
        vendor_id: '',
        vendor_name: '',
        contact_phone: '',
        service_type: '',
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendor((prevVendor) => ({
            ...prevVendor,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
                .from('vendor') // Ensure this matches your Supabase table name
                .insert([vendor]);
    
            if (error) throw error;
    
            // Optionally reset the form if successful
            setVendor({
                vendor_id: '',
                vendor_name: '',
                contact_phone: '',
                service_type: '',
            });
    
            console.log('Vendor added:', data); // Log data for confirmation
        } catch (error) {
            console.error('Error submitting vendor:', error.message);
        }
    };
    

    return (
        <div>
            <h2>Add Vendor</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="vendor_id">Vendor ID:</label>
                    <input
                        type="text"
                        id="vendor_id"
                        name="vendor_id"
                        value={vendor.vendor_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="vendor_name">Vendor Name:</label>
                    <input
                        type="text"
                        id="vendor_name"
                        name="vendor_name"
                        value={vendor.vendor_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contact_phone">Contact Phone:</label>
                    <input
                        type="text"
                        id="contact_phone"
                        name="contact_phone"
                        value={vendor.contact_phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="service_type">Service Type:</label>
                    <input
                        type="text"
                        id="service_type"
                        name="service_type"
                        value={vendor.service_type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Vendor</button>
            </form>
        </div>
    );
};

export default VendorForm;
