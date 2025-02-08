import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const VendorForm = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all vendor data from the vendor table
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const { data, error } = await supabase
                    .from('vendor') // Ensure this matches your table name
                    .select('*'); // Fetch all columns

                if (error) throw error;

                setVendors(data || []); // Set the vendors state with the fetched data
            } catch (error) {
                setError(error.message); // Set error message if fetching fails
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchVendors();
    }, []);

    if (loading) return <p>Loading...</p>; // Show loading state
    if (error) return <p>Error fetching vendors: {error}</p>; // Show error state

    return (
        <div>
            <h2>Vendor List</h2>
            {vendors.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Vendor ID</th>
                            <th>Vendor Name</th>
                            {/* Add other relevant columns here */}
                        </tr>
                    </thead>
                    <tbody>
    {vendors.map((vendor) => (
        <tr key={vendor.vendor_id}> {/* Adjust based on your vendor ID field */}
            <td>{vendor.vendor_id}</td>
            <td>{vendor.vendor_name}</td>
            {/* Display other vendor fields here */}
        </tr>
    ))}
</tbody>

                </table>
            ) : (
                <p>No vendors found.</p> // Message if no vendors exist
            )}
        </div>
    );
};

export default VendorForm;
