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
    title: '', 
    description: '', 
    date: '', 
    time: '', 
    seatNumber:'',
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
          title: resp.data.title, 
          description: resp.data.description, 
          date: resp.data.date, 
          time: resp.data.time,
          seatNumber: resp.data.seatNumber 
          
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
    setEventData({...eventData, loading:true})
    const formData = new formData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("seatNumber", eventData.seatNumber);

    axios.put("/api/eventData" + id,formData,
      {
        header:{
          token: auth.token
        }  
      }
    )
    .then((resp) => { setEventData({ ...eventData,reload: eventData.reload +1 , success: "Event Updated Successfully"  });  })
    .catch((err) => {  setEventData({ ...eventData,success:null, err: "some thing went wrong, please try again later!"  });   });

  }


    const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };
  

  return (
    <div className="manage-events-container">
      <div className="add-nav">
        <h3 style={{fontSize:"23px"}}>Update Event</h3>
      </div>
      <Ticket
          title={eventData.title}
          date={eventData.date}
          time={eventData.time}
          seatNumber={eventData.seatNumber}
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
