import React, { useState, useEffect } from "react";
import "../../../App.css";
import { Alert } from "react-bootstrap";
import { getAuthUser } from "../../../helper/Storage";
import Loader from "../../../Components/Loader";
import axios from "axios";

export default function AddEvent() {
  const auth = getAuthUser();

  const [eventData, setEventData] = useState({
    loading: false,
    title: "",
    description: "",
    date: "",
    time: "",
    seatNumber:"",
    err: "",
    success: null,
    reload:false,
  });

  // HITTING API
  useEffect(() => {
    setEventData({ ...eventData, loading: true });
    axios.get("/api/events")
      .then((resp) => {
        setEventData({ ...eventData, results: resp.data, loading: false });
      })
      .catch((err) => {
        setEventData({
          ...eventData,
          loading: false,
          err: "somthing went wrong, please try again later!",
        });
      });
  }, [eventData.reload]);

  //HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  //CREATE EVENT ON SUBMIT 
  const createEvent = (e) => {
    e.preventDefault();
    setEventData({ ...eventData, loading: true });
    const formData = new formData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("seatNumber", eventData.seatNumber);
    axios
      .post("/api/eventData", formData, {
        header: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setEventData({ ...eventData, success: "Event Created Successfully" });
      })
      .catch((err) => {
        setEventData({
          ...eventData,
          success: null,
          err: "some thing went wrong, please try again later!",
        });
      });
  };

  return (
    <div className="manage-events-container">
      <div className="add-nav">
        <h3 style={{ fontSize: "23px" }}>Add Event</h3>
      </div>
      <form onSubmit={createEvent} className="manage-events-form">
        {eventData.err && (
          <Alert variant={"danger"} className="auth-alert w-100">
            {eventData.err}
          </Alert>
        )}
        {eventData.success && (
          <Alert variant={"success"} className="auth-alert w-100">
            {eventData.success}
          </Alert>
        )}
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
          Create Event
        </button>
      </form>
    </div>
  );
}

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (isEditing) {
//     await updateEvent();
//   } else {
//     await createEvent();
//   }
// };

// const createEvent = async () => {
//   try {
//     const response = await fetch('/api/events', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(eventData),
//     });

//     if (response.ok) {
//       fetchEvents();
//       setEventData({ title: '', description: '', date: '', time: '', seatNumber: '' });
//     } else {
//       // Handle error
//     }
//   } catch (error) {
//     console.error('Error creating event:', error);
//   }
// };

// const updateEvent = async () => {
//   try {
//     const response = await fetch(`/api/events/${editEventId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(eventData),
//     });

//     if (response.ok) {
//       fetchEvents();
//       setEventData({ title: '', description: '', date: '', time: '', seatNumber: '' });
//       setIsEditing(false);
//       setEditEventId(null);
//     } else {
//       // Handle error
//     }
//   } catch (error) {
//     console.error('Error updating event:', error);
//   }
// };

// const handleEdit = (event) => {
//   setEventData({ title: event.title, description: event.description, date: event.date, time: event.time, seatNumber: event.seatNumber });
//   setIsEditing(true);
//   setEditEventId(event._id);
// };

// const handleDelete = async (eventId) => {
//   try {
//     const response = await fetch(`/api/events/${eventId}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       fetchEvents();
//     } else {
//       // Handle error
//     }
//   } catch (error) {
//     console.error('Error deleting event:', error);
//   }
// };

// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert';
// import { Link } from 'react-router-dom';
// import '../../../App.css';

// export default function AddEvents() {
//   return (
//     <div>
//     <section className="container">
//         <div className="circle circle-one"></div>
//         <div className="form-container">
//           <h1 >Add Event</h1>
//           <form>
//             <Alert variant={'danger'} className='auth-alert'>Simple Alert</Alert>
//             <Alert variant={'success'} className='auth-alert'>Simple Alert</Alert>
//             <input type="text" placeholder="Event Name" />
//             <input type="password" placeholder="PASSWORD" />
//             {/* <th>Event Name</th>
//             <th>Description</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Seat Number</th> */}
//             <button className="opacity">SUBMIT</button>
//           </form>
//           <div className="register-forget opacity">
//           </div>
//         </div>
//     </section>
//   </div>
//   )
// }
