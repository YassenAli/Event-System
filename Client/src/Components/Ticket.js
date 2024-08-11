import React from 'react';
import './Components.css';

const Ticket = ({ props }) => {
  return (
    <div className="ticketWrap">
      <div className="ticket ticketLeft">
        <h1 className='ticket-title'>Event <span>Booking</span></h1>
        <div className="eventTitle">
          <h2>{props.title}</h2>
          <span><p>{props.description}</p></span>
        </div>
        <div className="seatNumber">
          <h2>{props.seatNumber}</h2>
          <span>Seat</span>
        </div>
        <div className="showTime">
          <h2>{props.time}</h2>
          <span>Time</span>
        </div>
        <div className="showDate">
          <h2>{props.date}</h2>
          <span>Date</span>
        </div>
      </div>
      <div className="ticket ticketRight">
        <div className="eye"></div>
        <div className="ticketNumber">
          <h3>{props.seatNumber}</h3>
          <span>Seat</span>
        </div>
        <button className='ticket-btn'>Ticket</button>
      </div>
    </div>
  );
};

export default Ticket;
