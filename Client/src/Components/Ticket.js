import React from 'react';
import './Components.css';

const Ticket = ({ title, description, date, time, seatNumber }) => {
  return (
    <div className="ticketWrap">
      <div className="ticket ticketLeft">
        <h1 className='ticket-title'>Event <span>Booking</span></h1>
        <div className="eventTitle">
          <h2>{title}</h2>
          <span><p>{description}</p></span>
        </div>
        <div className="seatNumber">
          <h2>{seatNumber}</h2>
          <span>Seat</span>
        </div>
        <div className="showTime">
          <h2>{time}</h2>
          <span>Time</span>
        </div>
        <div className="showDate">
          <h2>{date}</h2>
          <span>Date</span>
        </div>
      </div>
      <div className="ticket ticketRight">
        <div className="eye"></div>
        <div className="ticketNumber">
          <h3>{seatNumber}</h3>
          <span>Seat</span>
        </div>
        <button className='ticket-btn'>Ticket</button>
      </div>
    </div>
  );
};

export default Ticket;
