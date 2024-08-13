import React, { useState, useEffect } from 'react';
import '../../../App.css';
import Loader from "../../../Components/Loader";
import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";
import { useParams } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import Ticket from '../../../Components/Ticket';

export default function UpdateEvent() {
  let { id } = useParams();
  const auth = getAuthUser();

  const [eventData, setEventData] = useState({ 
    loading: false,
    name: '', 
    description: '', 
    date: '', 
    time: '', 
    location:'',
    err: '',
    success :null,
    reload:false,
  });

  // HITTING API
  useEffect(() => {
    setEventData({ ...eventData, loading: true });
    axios.get("/api/events" + id).then((resp) => {
        setEventData({
          ...eventData,
          name: resp.data.name, 
          description: resp.data.description, 
          date: resp.data.date, 
          time: resp.data.time,
          location: resp.data.location
          
        });
      })
      .catch((err) => {
        setEventData({
          ...eventData,
          loading: false,
          err: "somthing went wrong, please try again later!",
        });
      });
  }, [eventData.reload]);


  const updateEvent = (e) =>{
    e.preventDefault();
    setEventData({...eventData, loading:true});
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("location", eventData.location);

    axios.put("/api/events" + id,formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((resp) => { setEventData({ ...eventData,reload: eventData.reload +1 , success: "Event Updated Successfully"  });  })
    .catch((err) => {  setEventData({ ...eventData,success:null, err: "some thing went wrong, please try again later!"  });   });

  }


  //   const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEventData({ ...eventData, [name]: value });
  // };
  

  return (
    <div className="manage-events-container">
      <div className="add-nav">
        <h3 style={{fontSize:"23px"}}>Update Event</h3>
      </div>
      <Ticket
          name={eventData.name}
          date={eventData.date}
          time={eventData.time}
          location={eventData.location}
          description={eventData.description}/>

      <form onSubmit={updateEvent} className="manage-events-form">
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
          name="name"
          value={eventData.name}
          onChange={(e) => setEventData({...eventData, name: e.target.value})} //onChange={(e) => setEventData({...eventData, name: e.target.value})}
          placeholder="name"
          required
          className="manage-events-input"
        />
        <textarea
          name="description"
          value={eventData.description}
          onChange={(e) => setEventData({...eventData, description: e.target.value})}
          placeholder="Description"
          required
          className="manage-events-input"
        />
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={(e) => setEventData({...eventData, date: e.target.value})}
          required
          className="manage-events-input"
        />
        <input
          type="time"
          name="time"
          value={eventData.time}
          onChange={(e) => setEventData({...eventData, time: e.target.value})}
          required
          className="manage-events-input"
        />
        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={(e) => setEventData({...eventData, location: e.target.value})}
          placeholder="location"
          required
          className="manage-events-input"
        />
        <button type="submit" className="manage-events-button">
          Update Event
        </button>
      </form>
    </div>
);
}



  // const [isEditing, setIsEditing] = useState(false);
  // const [editEventId, setEditEventId] = useState(null);



  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  // const fetchEvents = async () => {
  //   try {
  //     const response = await fetch('/api/events');
  //     const data = await response.json();
  //     setEvents(data);
  //   } catch (error) {
  //     console.error('Error fetching events:', error);
  //   }
  // };



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
  //       setEventData({ name: '', description: '', date: '', time: '', location: '' });
  //     } else {
  //       console.error('Failed to create event');
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
  //       setEventData({ name: '', description: '', date: '', time: '', location: '' });
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
