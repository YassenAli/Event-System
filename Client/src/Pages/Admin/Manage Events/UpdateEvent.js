import React, { useState, useEffect } from 'react';
import '../../../App.css';

export default function UpdateEvent() {
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({ title: '', description: '', date: '', time: '', seatNumber: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateEvent();
    } else {
      await createEvent();
    }
  };

  const createEvent = async () => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        fetchEvents();
        setEventData({ title: '', description: '', date: '', time: '', seatNumber: '' });
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const updateEvent = async () => {
    try {
      const response = await fetch(`/api/events/${editEventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        fetchEvents();
        setEventData({ title: '', description: '', date: '', time: '', seatNumber: '' });
        setIsEditing(false);
        setEditEventId(null);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleEdit = (event) => {
    setEventData({ title: event.title, description: event.description, date: event.date, time: event.time, seatNumber: event.seatNumber });
    setIsEditing(true);
    setEditEventId(event._id);
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchEvents();
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="manage-events-container">
      <div className="add-nav">
        <h3 style={{fontSize:"26px"}}>Update Event</h3>
      </div>
      <form onSubmit={handleSubmit} className="manage-events-form">
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="manage-events-input"
        />
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="manage-events-input"
        />
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
          className="manage-events-input"
        />
        <input
          type="time"
          name="time"
          value={eventData.time}
          onChange={handleChange}
          required
          className="manage-events-input"
        />
        <input
          type="text"
          name="seatNumber"
          value={eventData.seatNumber}
          onChange={handleChange}
          placeholder="Seat Number"
          required
          className="manage-events-input"
        />
        <button type="submit" className="manage-events-button">
          {/* {isEditing ? 'Update Event' : 'Create Event'} */}
          Update Event
        </button>
      </form>
    </div>
  );
}

