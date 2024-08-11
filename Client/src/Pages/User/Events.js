import React, { useState, useEffect } from 'react';
import '../../App.css';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [userEmail, setUserEmail] = useState('user@example.com'); // replace with actual user email
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchBookings();
    const intervalId = setInterval(() => {
      fetchEvents();
      fetchBookings();
    }, 5000); // Adjust interval as needed

    return () => clearInterval(intervalId); // Cleanup on unmount
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

  const fetchBookings = async () => {
    try {
      const response = await fetch(`/api/bookings?email=${userEmail}`);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleBook = async (eventId) => {
    try {
      const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventId, email: userEmail }),
    });

    if (response.ok) {
      fetchBookings();
    } else {
      console.error('Error booking event');
    }
  } catch (error) {
    console.error('Error booking event:', error);
  }
};

  const handleCancel = async (bookingId) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchBookings();
    } else {
      console.error('Error canceling booking');
    }
  } catch (error) {
    console.error('Error canceling booking:', error);
  }
};

  return (
    <div >
      <div className="top-main-head d-flex justify-content-between mb-3" style={{backgroundColor:"#efe8d8"}}>
        <h3 style={{fontSize:"26px", color:"#524a37"}}>Events</h3>
      </div>
      <div className="event-list">
        {events.map((event) => (
          <div key={event._id} className="event-list-item">
            <span>{event.title} ({event.date} at {event.time})</span>
            {bookings.some(booking => booking.eventId === event._id) ? (
              <button onClick={() => handleCancel(event._id)} className="cancel-button">Cancel Booking</button>
            ) : (
              <button onClick={() => handleBook(event._id)} className="book-button">Book</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
