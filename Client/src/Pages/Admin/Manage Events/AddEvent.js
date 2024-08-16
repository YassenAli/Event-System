import React, { useState, useEffect } from "react";
import "../../../App.css";
import { Alert } from "react-bootstrap";
import { getAuthUser, getAccessToken } from "../../../helper/Storage";
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
    location: "",
    err: "",
    success: null,
    reload: false,
  });

  // HITTING API
  useEffect(() => {
    setEventData({ ...eventData, loading: true });
    axios
      .get("http://127.0.0.1:8000/api/events/",
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      )
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
  }, []);

  //HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  //CREATE EVENT ON SUBMIT
  const createEvent = (e) => {
    e.preventDefault();
    setEventData({ ...eventData, loading: true });
    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("location", eventData.location);
    axios
      .post("http://127.0.0.1:8000/api/events/", formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((resp) => {
        console.log(resp)
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
          onChange={handleChange}
          placeholder="name"
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
          name="location"
          value={eventData.location}
          onChange={handleChange}
          placeholder="Location"
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
