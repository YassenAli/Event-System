import React from 'react'
import { TiUserAdd } from "react-icons/ti";
import { BiSolidCalendarEdit } from "react-icons/bi";
import { HiOutlineTicket } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { HiTicket } from "react-icons/hi2";
import { TbTicketOff } from "react-icons/tb";
import { GiTicket } from "react-icons/gi";

import '../../App.css';
export default function SideBar() {
    return (
        <div className="user-dashboard__sidebar">
            {/* -----------------< for User >----------------- */}
            {/* Events and Event booking */}
            <Link to={'events'} className="user-dashboard__sidebar-link">
                <HiOutlineTicket fontSize={"24px"} />
            </Link>

            {/* Booked Events and Cancel booking */}
            <Link to={'bookedevent'} className="user-dashboard__sidebar-link">
                <TbTicketOff fontSize={"24px"} />
            </Link>

            {/* -----------------< for Admin >----------------- */}
            {/* to show Booked Events by Users */}
            <Link to="user-bookings" className="user-dashboard__sidebar-link">
                <HiTicket fontSize={"24px"} />
            </Link>

            {/* for manage User */}
            <Link to="manage-user" className="user-dashboard__sidebar-link">
                <TiUserAdd fontSize={"24px"} />
            </Link>

            {/* for manage Events */}
            <Link to="manage-events" className="user-dashboard__sidebar-link">
                <BiSolidCalendarEdit fontSize={"24px"} />
            </Link>

        </div>
    )
}
