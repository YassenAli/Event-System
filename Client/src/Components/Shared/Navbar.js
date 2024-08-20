import React from "react";
import { FaDotCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { removeAuthUser, getAuthUser } from "../../helper/Storage";
export default function Navbar() {
    const navigate = useNavigate();
    const auth = getAuthUser();
    // console.log(auth);
    const Login = () => {
        navigate("/login");
    };
    const Logout = () => {
        removeAuthUser();
        navigate("/");
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
            {/* login */}
            <div className="user-dashboard__header-right">
                {
                    /* Unauthenticated Routes */
                    !auth && (
                        <button
                            onClick={Login}
                            className="user-dashboard__logout-btn"
                            style={{ backgroundColor: "#c08610" }}
                        >
                            <IoMdLogIn className="login-sign" fontSize={"24px"} />
                            <div className="logout-text">Login</div>
                        </button>
                    )
                }

                {
                    /* Authenticated Routes */
                    auth && (
                        <button className="user-dashboard__logout-btn" onClick={Logout}>
                            <IoMdLogOut className="logout-sign" fontSize={"24px"} />
                            <div className="logout-text">Logout</div>
                        </button>
                    )
                }
            </div>
        </div>
    );
}
