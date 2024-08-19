import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import Loader from "../Components/Loader";
import Ticket from "../Components/Ticket";
import Alert from "react-bootstrap/Alert";
import { Form, FormControl, Button } from "react-bootstrap";
import { getAuthUser } from "../helper/Storage";
import { HiOutlineTicket } from "react-icons/hi";
import { Box } from "@mui/material";


export default function Events() {
  const auth = getAuthUser();
  const [userEmail, setUserEmail] = useState(auth?.email || "");
  const [events, setEvents] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  console.log('User Dat', getAuthUser());
  const [bookings, setBookings] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [justBooked, setJustBooked] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (auth && auth.email) {
      setUserEmail(auth.email);
    } else {
      console.error("User is not authenticated or email is missing.");
    }

    setEvents({ ...events, loading: true });
    axios
      .get("http://127.0.0.1:8000/api/events/", {
        params: { search: "" },  // Adjust if needed
      })
      .then((resp) => {
        setEvents({ ...events, results: resp.data, loading: false });
      })
      .catch((err) => {
        setEvents({
          ...events,
          loading: false,
          err: "Something went wrong, please try again later!",
        });
      });

    axios.get("http://127.0.0.1:8000/api/events/", {
      params: {
        search: search,
      }
    }).then((resp) => {
      setEvents({ ...events, results: resp.data, loading: false });
    }).catch((err) => {
      setEvents({ ...events, loading: false, err: 'Something went wrong, please try again later!' });
    });

  }, [events.reload]);

  useEffect(() => {
    if (auth && justBooked) {
      fetchBookings();
    }
  }, [auth, justBooked]);

  const fetchBookings = async () => {
    setBookingLoading(true);
    try {

      const response = await axios.get("http://127.0.0.1:8000/api/bookings/", {
        params: { email: userEmail },

      // const response = await axios.get(`http://127.0.0.1:8000/api/bookings`, {
      //   params: { email: userEmail }

      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setBookingLoading(false);
      setJustBooked(false);
    }
  };

  const handleBook = async (eventId) => {
    if (!userEmail) {
      console.error("User email is not set. Cannot book the event.");
      return;
    }

    try {

      const bookingData = {
        event: eventId,
        user: userEmail,
      };

      console.log("Booking Event with:", bookingData);

      // const response = await axios.post("http://127.0.0.1:8000/api/bookings/", bookingData);

      const response = await axios.post('http://127.0.0.1:8000/api/bookings', {
        eventId,
        email: userEmail,
      });


      if (response.status === 200) {
        setJustBooked(true);
      } else {
        console.error("Error booking event with status:", response.status);
      }
    } catch (error) {
      console.error("Error booking event:", error.response?.data || error.message);
    }
  };

  const handleCancel = async (eventId) => {
    try {
      const booking = bookings.find((booking) => booking.eventId === eventId);
      if (booking) {

        const response = await axios.delete(
          `http://127.0.0.1:8000/api/bookings/${booking._id}`
        );

        // const response = await axios.delete(`http://127.0.0.1:8000/api/bookings/${booking._id}`);


        if (response.status === 200) {
          setJustBooked(true);
        } else {
          console.error("Error canceling booking");
        }
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };
  const searchEvents = (e) => {
    e.preventDefault();
    setEvents({ ...events, reload: events.reload + 1 });
  };

  return (
    <div>
      {events.loading && <Loader />}

      {!events.loading && !events.err && (
        <>
          <div
            className="top-main-head d-flex justify-content-between mb-3"
            style={{ backgroundColor: "#efe8d8" }}
          >
            <h3 style={{ fontSize: "23px", color: "#524a37" }}>
              Events{" "}
              <HiOutlineTicket
                fontSize={"28px"}
                style={{ marginBottom: "3px" }}
              />
            </h3>

            <Form className="d-flex" onSubmit={searchEvents}>
              <FormControl
                type="search"
                placeholder="Search"
                value={search}
                className="me-2"
                style={{ fontSize: "14px" }}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant="outline-success"
                type="submit"
                style={{ fontSize: "14px" }}
              >
                Search
              </Button>
            </Form>
          </div>
          <div className="event-list">
            {!events.loading && events.err && (
              <div className="d-flex justify-content-center align-items-center">
                <Alert variant="danger" className="auth-alert text-center w-50">
                  {events.err}
                </Alert>
              </div>
            )}

            {!auth && (
              <div className="d-flex justify-content-center align-items-center">
                <Alert
                  variant="warning"
                  className="auth-alert text-center w-50"
                >
                  Please, login first to be able to book!
                </Alert>
              </div>
            )}

            {!events.loading && !events.err && events.results.length === 0 && (
              <div className="d-flex justify-content-center align-items-center">
                <Alert variant="info" className="auth-alert text-center w-50">
                  There Is No Events 🎟!
                </Alert>
              </div>
            )}

            {events.results.map((event) => {
              const isBooked = bookings.some(
                (booking) => booking.eventId === event.id
              );
              return (
                <Box display="grid" justifyContent="center" flexWrap="wrap" key={event.id}>
                  <Ticket
                    props={event}
                    isBooked={isBooked}
                    handleCancel={handleCancel}
                    handleBook={handleBook}
                  />
                </Box>
              );
            })}
          </div>
        </>
      )}



      {
        !events.loading && !events.err && events.results.length === 0 && (
          <div className="d-flex justify-content-center align-items-center">
            <Alert variant="info" className="auth-alert text-center w-50">
              There Is No Events 🎟!
            </Alert>
          </div>
        )
      }

    </div>
  );
}

