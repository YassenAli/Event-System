import React from 'react';
import './Components.css';
import { RiEyeLine } from "react-icons/ri";
import { IoTicketOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { HiMiniCalendar } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";

const Ticket = ({ props, isBooked, handleCancel, handleBook }) => {
  return (
    <div className="ticketWrap">
      <div className="ticket ticketLeft">

        <h1 className='ticket-title'> {props.name}</h1>
        <div className="ticket-des">
          <span><IoTicketOutline style={{marginBottom:'4px',fontSize:'15px'}}/> DISCRIPTION</span>
          <p>{props.description}</p>

        <h1 className='ticket-title'>Event <span>Booking</span></h1>
        <div className="eventTitle">
          <h2>{props.name}</h2>
          <span><p>{props.description}</p></span>
        </div>
        <div className="location">
          <h2>{props.location}</h2>
          <span>Location</span>

        </div>
        <div className="showTime">
          <span><MdAccessTime style={{marginBottom:'4px'}}/> Time</span>
          <h2>{props.time}</h2>
        </div>
        <div className="showDate">
          <span><HiMiniCalendar style={{marginBottom:'4px'}}/> Date</span>
          <h2>{props.date}</h2>
        </div>
      </div>
      <div className="ticket ticketRight">
        <div className='eye'><RiEyeLine fontSize={"32px"} color='#efe8d8'/></div>
        <div className="location">
          <span><IoLocationOutline style={{marginBottom:'4px',fontSize:'12px'}}/> location</span>
          <h6 >{props.location}</h6>
        </div>
        {/* Conditional Cancel Button */}
        {isBooked && (
          <button onClick={() => handleCancel(props.id)} className="ticket-btn">
            Cancel Booking
          </button>
        )}
        {!isBooked && (
          <button onClick={() => handleBook(props.id)} className="ticket-btn">Book</button>
        )}
          </div>
      </div>
    </div>
  );
};

export default Ticket;

