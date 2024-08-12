import React, { useState, useEffect } from 'react';
import '../../App.css';
import axios from "axios";
import Loader from './../../Components/Loader';
import Ticket from '../../Components/Ticket';
import { Alert } from 'react-bootstrap';
import { Form, FormControl, Button } from 'react-bootstrap';

export default function Events() {
  const [events, setEvents] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  const [search, setSearch] = useState([]);


  const [userEmail, setUserEmail] = useState(''); // replace with actual user email
  const [bookings, setBookings] = useState([]);

  /* new code */
  useEffect(() => {
    setEvents({ ...events, loading: true })
    axios.get("/api/events")
      .then((resp) => {
        setEvents({ ...events, results: resp.data, loading: false })

      }).catch((err) => {
        setEvents({ ...events, loading: false, err: 'somthing went wrong, please try again later!' })
      })
  }, [events.reload]); //عشان كل ما الريلود يتغير يحصل كول لليوز ايفيكت



  // useEffect(() => {
  //   fetchEvents();
  //   fetchBookings();
  //   const intervalId = setInterval(() => {
  //     fetchEvents();
  //     fetchBookings();
  //   }, 5000); // Adjust interval as needed

  //   return () => clearInterval(intervalId); // Cleanup on unmount
  // }, []);



  // const fetchEvents = async () => {
  //   try {
  //     const response = await fetch('/api/events');
  //     const data = await response.json();
  //     setEvents({ ...events, loading: false, results: data, err: null });
  //   } catch (error) {
  //     console.error('Error fetching events:', error);
  //     setEvents({ ...events, loading: false, err: 'Failed to load events' });
  //   }
  // };

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

  // if (events.loading) {
  //   return <div>Loading events...</div>;
  // }

  // if (events.err) {
  //   return <div>{events.err}</div>;
  // }
  const searchEvents =() =>{

  }

  return (
    <div>
      {/* Loader */}
      {
        events.loading === true && (
          <Loader />
        )
      }
      
      {/* List Events */}
      {
        events.loading === false && events.err == null && (
          <>
            <div className="top-main-head d-flex justify-content-between mb-3" style={{ backgroundColor: "#efe8d8" }}>
              <h3 style={{ fontSize: "26px", color: "#524a37" }}>Events 🎫</h3>
              <Form className="d-flex">
            <FormControl
                type="search"
                required
                onSubmit={searchEvents}
                placeholder="Search"
                className="me-2"
                style={{ fontSize: '16px' }}
                aria-label="Search"
            />
            <Button variant="outline-success" style={{ fontSize: '16px' }}>Search</Button>
        </Form>
            </div>
            <div className="event-list">

              {events.results.map((event) => (
                <div key={event.id} className="event-list-item">
                  <Ticket
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    seatNumber={event.seatNumber}
                    description={event.description}
                  />
                  {bookings.some(booking => booking.eventId === event._id) ? (
                    <button onClick={() => handleCancel(event._id)} className="cancel-button">Cancel Booking</button>
                  ) : (
                    <button onClick={() => handleBook(event._id)} className="book-button">Book</button>
                  )}
                </div>
              ))}
            </div>
          </>
        )
      }

      {/* Errors Handling */}
      {
        events.loading === false && events.err !== null && (
          <div className="d-flex justify-content-center align-items-center ">
            <Alert variant="danger" className="auth-alert text-center w-50">
              {events.err}
            </Alert>
          </div>
        )
      }
    </div>
  );
}