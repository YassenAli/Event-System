import React from "react";
import { TiUserAdd } from "react-icons/ti";
import { BiSolidCalendarEdit } from "react-icons/bi";
import { HiOutlineTicket } from "react-icons/hi";
import { Link } from "react-router-dom";
import { HiTicket } from "react-icons/hi2";
import { TbTicketOff } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { GrHomeRounded } from "react-icons/gr";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getAuthUser, getAccessToken } from "../../helper/Storage";
import "../../App.css";

export default function SideBar() {
    const navigate = useNavigate();
    const auth = getAuthUser();

    let isAdmin = false;

    // console.log('accessToken', getAccessToken());
    // console.log('authaccess', auth.accessToken)
    if (auth && getAccessToken()) {
        try {
            const decodedToken = jwtDecode(getAccessToken());
            isAdmin = decodedToken?.is_superuser || false;
            // console.log('decodedToken', decodedToken);
            // console.log('sidebar', isAdmin);
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }


    return (
        <div className="user-dashboard__sidebar">
        {/* -----------------< for User >----------------- */}
        {/* Events and Event booking */}
        <Link to={"events"} className="user-dashboard__sidebar-link">
            <GrHomeRounded fontSize={"22px"} />
        </Link>

        {/* Booked Events and Cancel booking */}
        {/* <Link to={"bookedevent"} className="user-dashboard__sidebar-link">
            <TbTicketOff fontSize={"24px"} />
        </Link> */}

        {/* -----------------< for Admin >----------------- */}

        {
            /* Admin Routes */
            isAdmin && (
            <>
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
            </>
            )
        }
        </div>
    );
}
