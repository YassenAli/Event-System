import React, { useState, useEffect } from "react";
import "../../../App.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser, getAccessToken } from "../../../helper/Storage";
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

  useEffect(() => {
    setEvents({ ...events, loading: true });
    axios
      .get("http://127.0.0.1:8000/api/events/",{
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
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
        .delete(`http://127.0.0.1:8000/api/events/${id}/` , {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
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
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.results.map((event, index) => (
                <tr key={event.id}>
                  <td>{index + 1}</td>
                  <td>{event.name}</td>
                  <td>{event.description}</td>
                  <td>{event.date}</td>
                  <td>{event.time}</td>
                  <td>{event.location}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        deleteEvent(event.id);
                      }}
                      className="add-button"
                      style={{border:"#471a1a",boxShadow:"#471a1a", backgroundColor:"#f1d7d7" }}
                    >
                      <span className="button__text" style={{color:"#471a1a"}}>Delete</span>
                      <span className="button__icon" style={{color:"#471a1a", backgroundColor:"rgb(134, 36, 36)"}}><RiDeleteBin3Line /></span>
                    </button>
                    <Link to={`update/${event.id}`} 
                      className="add-button"
                      style={{border:"#471a1a",boxShadow:"#1a3f47", backgroundColor:"#d7e6f1" }}
                    >
                      <span className="button__text" style={{color:"#1a3f47"}}>Update</span>
                      <span className="button__icon" style={{color:"#1a3f47", backgroundColor:"rgb(36, 70, 134)"}}><MdOutlineTipsAndUpdates /></span>
                    </Link>

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
