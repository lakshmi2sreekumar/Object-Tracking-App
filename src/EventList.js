// src/components/EventList.js

import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')  // Adjusted to your table name
        .select('*');

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Event List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Description</th>
            <th>Organizer ID</th>
            <th>Venue ID</th>
            <th>Type</th>
            <th>Resource ID</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleString()}</td>
              <td>{event.location}</td>
              <td>{event.description}</td>
              <td>{event.organizer_id}</td>
              <td>{event.venue_id}</td>
              <td>{event.type}</td>
              <td>{event.registration_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;

