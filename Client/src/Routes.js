import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "./Components/NotFound";
import App from "./App";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import UserDashboard from "./Pages/User/UserDashboard";
import CancelBooking from "./Pages/User/CancelBooking";
import EventBooking from "./Pages/User/EventBooking";
import ManageUser from "./Pages/Admin/MangeUser";
import ManageEvents from "./Pages/Admin/MangeEvents";
import AdmEvents from "./Pages/Admin/AdmEvents";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "user",
        element: <UserDashboard />,
        children: [
          {
            index: true,
            element: <Navigate to="eventbook" replace />,
          },
          {
            path: "eventbook",
            element: <EventBooking />,
          },
          {
            path: "cancelbook",
            element: <CancelBooking />,
          },
        ],
      },
      {
        path: "admin",
        element: <AdminDashboard />,
        children: [
          {
            index: true,
            element: <Navigate to="adminevent" replace />,
          },
          {
            path: "adduser",
            element: <ManageUser />,
          },
          {
            path: "adminevent",
            element: <AdmEvents />,
          },
          {
            path: "addevent",
            element: <ManageEvents />,
          },
        ],
      },
    ],
  },
]);
