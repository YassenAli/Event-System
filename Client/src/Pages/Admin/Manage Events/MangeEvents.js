
import React, { useState, useEffect } from "react";
import "../../../App.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";
import Loader from "../../../Components/Loader";
import { MdEventNote } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

export default function ManageEvents() {
  const auth = getAuthUser();

  const [events, setEvents] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    setEvents({ ...events, loading: true });
    axios
      .get("/api/events")
      .then((resp) => {
        setEvents({ ...events, results: resp.data, loading: false });
      })
      .catch((err) => {
        setEvents({
          ...events,
          loading: false,
          err: "somthing went wrong, please try again later!",
        });
      });
  }, [events.reload]);

  const deleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete("/api/events/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          setEvents({ ...events, reload: events.reload + 1 });
        })
        .catch((err) => {
          setEvents({
            ...events,
            loading: false,
            err: "somthing went wrong, please try again later!",
          });
        });
    }
  };

  return (
    <div className="manage-events">
      {events.err && <Alert variant="danger">{events.err}</Alert>}
      {events.loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="top-main-head d-flex justify-content-between mb-3"
            style={{ backgroundColor: "rgb(218 230 233)" }}
          >
            <h3 style={{ fontSize: "23px", color: "rgb(51 84 95)" }}>
              Manage Events <MdEventNote fontSize={"28px"} style={{marginBottom:"3px"}}/>
            </h3>
            <Link to={"add"} class="add-button">
              <span class="button__text">Add Event</span>
              <span class="button__icon">+</span>
            </Link>
          </div>

          <Table striped bordered hover style={{ fontSize: "16px" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Time</th>
                <th>location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.results.map((event, index) => (
                <tr key={event._id}>
                  <td>{index + 1}</td>
                  <td>{event.name}</td>
                  <td>{event.description}</td>
                  <td>{event.date}</td>
                  <td>{event.time}</td>
                  <td>{event.location}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        deleteEvent(event._id);
                      }}
                      className="add-button"
                      style={{border:"#471a1a",boxShadow:"#471a1a", backgroundColor:"#f1d7d7" }}
                    >
                      <span className="button__text" style={{color:"#471a1a"}}>Delete</span>
                      <span className="button__icon" style={{color:"#471a1a", backgroundColor:"rgb(134, 36, 36)"}}><RiDeleteBin3Line /></span>
                    </button>
                    <Link to={`${event._id}`} 
                      className="add-button"
                      style={{border:"#471a1a",boxShadow:"#1a3f47", backgroundColor:"#d7e6f1" }}
                    >
                      <span className="button__text" style={{color:"#1a3f47"}}>Update</span>
                      <span className="button__icon" style={{color:"#1a3f47", backgroundColor:"rgb(36, 70, 134)"}}><MdOutlineTipsAndUpdates /></span>
                    </Link>
                    {/* <Link to={`/${event._id}`} className="btn btn-info">
                      view
                    </Link> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

// useEffect(() => {
//   fetchEvents();
// }, []);

// const fetchEvents = async () => {
//   try {
//     const response = await fetch("/api/events");
//     const data = await response.json();
//     setEvents(data);
//   } catch (error) {
//     console.error("Error fetching events:", error);
//   }
// };

// const handleDelete = async (eventId) => {
//   try {
//     const response = await fetch(`/api/events/${eventId}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       fetchEvents();
//     } else {
//       // Handle error
//     }
//   } catch (error) {
//     console.error("Error deleting event:", error);
//   }
// };

// import React, { useState, useEffect } from 'react';
// import '../../../App.css';

// export default function AddEvent() {
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
//         <p>Add Event</p>
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
//       <table className="event-list-table">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Seat Number</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {events.map((event) => (
//             <tr key={event._id} className="event-list-item">
//               <td>{event.title}</td>
//               <td>{event.description}</td>
//               <td>{event.date}</td>
//               <td>{event.time}</td>
//               <td>{event.seatNumber}</td>
//               <td>
//                 <button onClick={() => handleEdit(event)} className="edit-button">Edit</button>
//                 <button onClick={() => handleDelete(event._id)} className="delete-button">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

