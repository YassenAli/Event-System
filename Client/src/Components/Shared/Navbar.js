import React from "react";
import { FaDotCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
export default function Navbar() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("./login");
    };
    return (
        <div className="user-dashboard__header">
            <div className="user-dashboard__header-left">
                <span className="user-dashboard__icon">
                    <FaDotCircle
                        style={{ marginRight: "5px", fontSize: "37px", color: "#c08610" }}
                    />
                </span>
                <p className="user-dashboard__name">Evnti</p>
            </div>
            {/* logout */}
            <div className="user-dashboard__header-right">
            <button
            onClick={handleClick}
            className="user-dashboard__logout-btn"
            style={{ backgroundColor: "#c08610" }}
        >
            <IoMdLogIn className="login-sign" fontSize={"24px"} />
            <div className="logout-text">Login</div>
        </button>
                <button className="user-dashboard__logout-btn">
                    <IoMdLogOut className="logout-sign" fontSize={"24px"} />
                    <div className="logout-text">Logout</div>
                </button>
            </div>
        </div>
    );
}
