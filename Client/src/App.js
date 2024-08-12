import React from 'react'
import { Outlet } from "react-router-dom";
import './App.css';
import Navbar from './Components/Shared/Navbar';
import SideBar from './Components/Shared/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css'


export default function App() {
  return (
    <div className="user-dashboard">
      {/* navbar */}
      <Navbar />
      <div className="user-dashboard__content">
      {/* side bar */}
      <SideBar />
        {/* dispaly section outlet*/}
        <div className="user-dashboard__projects-section">
          <div className="user-dashboard__project-boxes jsGridView">
              <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
