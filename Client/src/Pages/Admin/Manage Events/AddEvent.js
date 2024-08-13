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
    name: "",
    description: "",
    date: "",
    time: "",
    location:"",
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
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEventData({ ...eventData, [name]: value });
  // };

  //CREATE EVENT ON SUBMIT 
  const createEvent = (e) => {
    e.preventDefault();
    setEventData({ ...eventData, loading: true });

    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("location", eventData.location);
    
    axios.post("/api/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setEventData({ ...eventData, success: "Event Created Successfully" });
      })
      .catch((err) => {
        console.log(err);
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
          name="name"
          value={eventData.name}
          onChange={(e) => setEventData({...eventData, name:e.target.value})}  //onChange={(e) => setEventData({...eventData, name:e.target.value})} 
          placeholder="name"
          required
          className="manage-events-input"
        />
        <textarea
          name="description"
          value={eventData.description}
          onChange={(e) => setEventData({...eventData, description:e.target.value})} 
          placeholder="Description"
          required
          className="manage-events-input"
        />
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={(e) => setEventData({...eventData, date:e.target.value})} 
          required
          className="manage-events-input"
        />
        <input
          type="time"
          name="time"
          value={eventData.time}
          onChange={(e) => setEventData({...eventData, time:e.target.value})}
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
          Create Event
        </button>
      </form>
    </div>
  );
}
