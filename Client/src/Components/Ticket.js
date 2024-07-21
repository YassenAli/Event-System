import React from 'react';
import './Components.css';

const Ticket = () => {
  return (
    <div className="ticketWrap">
      <div className="ticket ticketLeft">
        <h1>Startup <span>Cinema</span></h1>
        <div className="movieTitle">
          <h2>Title</h2>
          <span><p>lorem ipsom blabalablabalblablabl</p></span>
        </div>

        <div className="seatNumber">
          <h2>156</h2>
          <span>seat</span>
        </div>
        <div className="showTime">
          <h2>12:00</h2>
          <span>time</span>
        </div>
      </div>
      <div className="ticket ticketRight">
        <div className="eye"></div>
        <div className="ticketNumber">
          <h3>156</h3>
          <span>seat</span>
        </div>
        <button className='ticket-btn'>Ticket</button>
      </div>
    </div>
  );
};

export default Ticket;
