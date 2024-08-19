import React, { useState, useEffect } from "react";
import "../../../App.css";
import Loader from "../../../Components/Loader";
import axios from "axios";
import { getAuthUser, getAccessToken } from "../../../helper/Storage";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Ticket from "../../../Components/Ticket";

export default function UpdateEvent() {
  let { id } = useParams();
  const auth = getAuthUser();

  const [eventData, setEventData] = useState({
    loading: false,
    title: "",
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
      .get("http://127.0.0.1:8000/api/events/" + id)
      .then((resp) => {
        setEventData({
          ...eventData,
          title: resp.data.title,
          description: resp.data.description,
          date: resp.data.date,
          time: resp.data.time,
          location: resp.data.location,
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

  const updateEvent = (e) => {
    e.preventDefault();
    setEventData({ ...eventData, loading: true });
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("location", eventData.location);

    axios
      .put("http://127.0.0.1:8000/api/events/" + id, formData, {
        header: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((resp) => {
        setEventData({
          ...eventData,
          reload: eventData.reload + 1,
          success: "Event Updated Successfully",
        });
      })
      .catch((err) => {
        setEventData({
          ...eventData,
          success: null,
          err: "some thing went wrong, please try again later!",
        });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  return (
    <div className="manage-events-container">
      <div className="add-nav">
        <h3 style={{ fontSize: "23px" }}>Update Event</h3>
      </div>
      <Ticket
        title={eventData.title}
        date={eventData.date}
        time={eventData.time}
        location={eventData.location}
        description={eventData.description}
      />

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
          name="location"
          value={eventData.location}
          onChange={handleChange}
          placeholder="Location"
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
