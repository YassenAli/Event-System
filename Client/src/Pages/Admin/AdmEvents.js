import React from 'react'
import { Box } from "@mui/material";
import '../Pages.css';

import Ticket from '../../Components/Ticket'

export default function AdmEvents() {
  return (
    <div>
      <div className="user-dashboard__projects-section-header">
            <p>Events</p>
      </div>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
              <Ticket />
              <Ticket />
              <Ticket />
              <Ticket />
              <Ticket />
              <Ticket />
              <Ticket />
              <Ticket />
              <Ticket />
              <Ticket />
      </Box>

    </div>
  )
}
