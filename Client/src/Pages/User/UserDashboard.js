import React from 'react';
import { FaDotCircle } from 'react-icons/fa';
import '../Pages.css';
import { TiUserAdd } from "react-icons/ti";
import { BiSolidCalendarEdit } from "react-icons/bi";
import { HiOutlineTicket } from "react-icons/hi";
import { IoMdLogOut } from "react-icons/io";
import { Box } from "@mui/material";
import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { TbTicketOff } from "react-icons/tb";

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <div className="user-dashboard__header">
        <div className="user-dashboard__header-left">
          <span className="user-dashboard__icon"><FaDotCircle style={{ marginRight: "5px", fontSize: "30px", color: "#c08610" }} /></span>
          <p className="user-dashboard__name">Evnti</p>
        </div>
        <div className="user-dashboard__header-right">
          <button className="user-dashboard__logout-btn">
            <IoMdLogOut fontSize={"24px"} />
          </button>
        </div>
      </div>

      <div className="user-dashboard__content">
        <div className="user-dashboard__sidebar">
          {/*event booking */}
          <Link to={'/eventbook'} className="user-dashboard__sidebar-link">
            <HiOutlineTicket fontSize={"24px"} />
          </Link>

          {/*cancel booking */}
          <Link to={'/cancelbook'} className="user-dashboard__sidebar-link">
            <TbTicketOff fontSize={"24px"} />
          </Link>
        </div>

        <div className="user-dashboard__projects-section">
          <div className="user-dashboard__project-boxes jsGridView">
            <Box display="flex" justifyContent="center" flexWrap="wrap">
              <Outlet />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
