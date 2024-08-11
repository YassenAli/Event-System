import React, { useState, useEffect } from "react";
import "../../../App.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
export default function ManageUser() {
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetchusers();
  }, []);

  const fetchusers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setusers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`/api/users/${eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchusers();
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="manage-users">
      <div className="top-main-head d-flex justify-content-between mb-3" style={{backgroundColor:"rgb(218 233 222 / 96%)"}}>
        <h3 style={{fontSize:"26px", color:"rgb(51 95 51)"}}>Manage Users</h3>
        <Link to={"add-user"} class="add-button">
          <span class="button__text">Add User</span>
          <span class="button__icon">+</span>
        </Link>
      </div>
      <Table striped bordered hover style={{fontSize:"16px"}}>
      <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((event, index) => (
            <tr key={event._id}>
              <td>{index + 1}</td>
              {/* <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.date}</td> */}
              <td>
                {/* <button onClick={() => handleDelete(event._id)} className='btn btn-danger'>Delete</button>
                  <Link to={`update/${event._id}`} className='btn btn-success mx-1'>Update</Link>
                  <Link to={`view/${event._id}`} className='btn btn-info'>view</Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
