/* ticket */

import React from "react";
import "./Components.css";
import { MdAccessTime } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { TbTicketOff } from "react-icons/tb";
import { TbTicket } from "react-icons/tb";
import { BsCalendar2Event } from "react-icons/bs";

const Ticket = ({ props, isBooked, handleCancel, handleBook }) => {
  // console.log("props", props);
  return (
    <div className="event-card">
      <div className="time-box">
        <div className="time-icon">
          <BsCalendar2Event />
          <div className="date">{props.date}</div>
        </div>
        <div className="time">
          <MdAccessTime style={{ marginBottom: "3px" }} /> {props.time}
        </div>
      </div>

      <div className="location">
        <div className="time-icon">
          <IoLocationOutline />
          <div className="date">{props.location}</div>
        </div>
      </div>

      <div className="event-body">
        <div className="event-name">{props.name}</div>
        <div className="dsrp">{props.description}</div>
        <div className="event-bottom"></div>
      </div>

      <div className="ticket-btn">
        {isBooked && (
          <button onClick={() => handleCancel(props.id)} className="cancel-btn">
            <TbTicketOff fontSize={"21px"} />
          </button>
        )}
        {!isBooked && (
          <button onClick={() => handleBook(props.id)} className="book-btn">
            <TbTicket fontSize={"21px"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Ticket;