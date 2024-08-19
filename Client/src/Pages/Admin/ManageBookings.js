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
        const response = await axios.get('http://127.0.0.1:8000/api/bookings/');
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
              <th>Location</th>
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
                <td>{booking.location}</td>
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
