import React, { useState, useEffect } from 'react';
import '../../App.css';import axios from 'axios';
import Loader from '../../Components/Loader';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import { PiTicketBold } from "react-icons/pi";

export default function AUserBookings() {
  const [userBookings, setUserBookings] = useState({
    loading: true,
    results: [],
    err: null,
  });

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get('/api/admin/bookings');
        setUserBookings({ loading: false, results: response.data, err: null });
      } catch (error) {
        setUserBookings({ loading: false, err: 'Failed to load user bookings' });
      }
    };

    fetchUserBookings();
  }, []);

  return (
    <div className="admin-events-container">
    <div className="top-main-head d-flex justify-content-between mb-3" style={{backgroundColor:"#f2dee1"}}>
      <h3 style={{fontSize:"23px", color:"rgb(90 56 92)"}}>User Bookings <PiTicketBold fontSize={"28px"} style={{marginBottom:"3px"}}/></h3>
    </div>
    <div className="booking-list">
      {userBookings.loading && <Loader />}

      {userBookings.err && (
        <Alert variant="danger" className="text-center">
          {userBookings.err}
        </Alert>
      )}

      {!userBookings.loading && !userBookings.err && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Event Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Seat Number</th>
            </tr>
          </thead>
          <tbody>
            {userBookings.results.map((booking, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{booking.email}</td>
                <td>{booking.eventTitle}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.seatNumber}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {!userBookings.loading && !userBookings.err && userBookings.results.length === 0 && (
        <Alert variant="info" className="text-center">
          No bookings found!
        </Alert>
      )}
    </div>
    </div>
  );
}



// import React, { useState, useEffect } from 'react';
// import '../Pages.css';

// export default function ManageEvents() {
//   const [events, setEvents] = useState([]);
//   const [eventData, setEventData] = useState({ title: '', description: '', date: '', time: '', seatNumber: '' });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editEventId, setEditEventId] = useState(null);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch('/api/events');
//       const data = await response.json();
//       setEvents(data);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventData({ ...eventData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       await updateEvent();
//     } else {
//       await createEvent();
//     }
//   };

//   const createEvent = async () => {
//     try {
//       const response = await fetch('/api/events', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(eventData),
//       });

//       if (response.ok) {
//         fetchEvents();
//         setEventData({ title: '', description: '', date: '', time: '', seatNumber: '' });
//       } else {
//         // Handle error
//       }
//     } catch (error) {
//       console.error('Error creating event:', error);
//     }
//   };

//   const updateEvent = async () => {
//     try {
//       const response = await fetch(`/api/events/${editEventId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(eventData),
//       });

//       if (response.ok) {
//         fetchEvents();
//         setEventData({ title: '', description: '', date: '', time: '', seatNumber: '' });
//         setIsEditing(false);
//         setEditEventId(null);
//       } else {
//         // Handle error
//       }
//     } catch (error) {
//       console.error('Error updating event:', error);
//     }
//   };

//   const handleEdit = (event) => {
//     setEventData({ title: event.title, description: event.description, date: event.date, time: event.time, seatNumber: event.seatNumber });
//     setIsEditing(true);
//     setEditEventId(event._id);
//   };

//   const handleDelete = async (eventId) => {
//     try {
//       const response = await fetch(`/api/events/${eventId}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         fetchEvents();
//       } else {
//         // Handle error
//       }
//     } catch (error) {
//       console.error('Error deleting event:', error);
//     }
//   };

//   return (
//     <div className="manage-events-container">
//       <div className="user-dashboard__projects-section-header">
//         <p>Add Events</p>
//       </div>
//       <form onSubmit={handleSubmit} className="manage-events-form">
//         <input
//           type="text"
//           name="title"
//           value={eventData.title}
//           onChange={handleChange}
//           placeholder="Title"
//           required
//           className="manage-events-input"
//         />
//         <textarea
//           name="description"
//           value={eventData.description}
//           onChange={handleChange}
//           placeholder="Description"
//           required
//           className="manage-events-input"
//         />
//         <input
//           type="date"
//           name="date"
//           value={eventData.date}
//           onChange={handleChange}
//           required
//           className="manage-events-input"
//         />
//         <input
//           type="time"
//           name="time"
//           value={eventData.time}
//           onChange={handleChange}
//           required
//           className="manage-events-input"
//         />
//         <input
//           type="text"
//           name="seatNumber"
//           value={eventData.seatNumber}
//           onChange={handleChange}
//           placeholder="Seat Number"
//           required
//           className="manage-events-input"
//         />
//         <button type="submit" className="manage-events-button">
//           {isEditing ? 'Update Event' : 'Create Event'}
//         </button>
//       </form>
//       <div className="event-list">
//         {events.map((event) => (
//           <div key={event._id} className="event-list-item">
//             <span>{event.title} ({event.date} at {event.time})</span>
//             <button onClick={() => handleEdit(event)} className="edit-button">Edit</button>
//             <button onClick={() => handleDelete(event._id)} className="delete-button">Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

