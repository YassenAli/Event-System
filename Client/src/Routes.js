import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import NotFound from "./Components/NotFound";
import BookedEvent from "./Pages/User/BookedEvent";
import Home from "./Pages/Home";
import ManageUser from "./Pages/Admin/Manage User/ManageUser";
import AUserBookings from "./Pages/Admin/AUserBookings";
import Login from './Components/Auth/Login';
import AddEvent from "./Pages/Admin/Manage Events/AddEvent";
import ManageEvents from "./Pages/Admin/Manage Events/MangeEvents";
import AddUser from "./Pages/Admin/Manage User/AddUser";
import UpdateEvent from "./Pages/Admin/Manage Events/UpdateEvent";
import Loader from "./Components/Loader";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="events" replace />,
      },
      //Guest middleware
      {
        element: <Guest />,
        children:[
          {
            path: '/login',
            element: <Login />,
          },
        ]
      },

      //Admin middleware
      {
        element: <Admin />,
        children:[
          {
            path: "/manage-user",
            children:[
              {
                path: "",
                element: <ManageUser />,
              },
              {
                path: "add-user",
                element: <AddUser />,
    
              },
              {
    
              }
            ]
          },
          {
            path: "user-bookings",
            element: <AUserBookings />,
          },
          {
            path: "/manage-events",
            children:[
              {
                path: "",
                element: <ManageEvents />,
              },
              {
                path: "add",
                element: <AddEvent/>,
              },
              {
                path: "update", //update
                element: <UpdateEvent />,
              },
            ]
          },
        ]
      },
      {
        path: "events",
        element: <Home />,
      },
      {
        path: "bookedevent",
        element: <BookedEvent />,
      },
      {
        index: true,
        element: <Navigate to="user-bookings" replace />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/load",
        element: <Loader />,
      },
    ]
  },]);





//-------------------------------< Old >---------------

// import { createBrowserRouter, Navigate } from "react-router-dom";
// import App from "./App";
// import NotFound from "./Components/NotFound";
// import AdminDashboard from "./Pages/Admin/AdminDashboard";
// import UserDashboard from "./Pages/User/UserDashboard";
// import BookedEvent from "./Pages/User/BookedEvent";
// import Events from "./Pages/User/Events";
// import ManageUser from "./Pages/Admin/MangeUser";
// import ManageEvents from "./Pages/Admin/MangeEvents";
// import AdmEvents from "./Pages/Admin/AdmEvents";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AdminDashboard />,
//     children: [
//       {
//         path: "*",
//         element: <NotFound />,
//       },
//       {
//         // path: "user",
//         element: <UserDashboard />,
//         children: [
//           {
//             index: true,
//             element: <Navigate to="events" replace />,
//           },
//           {
//             path: "events",
//             element: <Events />,
//           },
//           {
//             path: "bookedevent",
//             element: <BookedEvent />,
//           },
//         ],
//       },
//       {
//         // path: "admin",
//         element: <AdminDashboard />,
//         children: [
//           {
//             index: true,
//             element: <Navigate to="adminevent" replace />,
//           },
//           {
//             path: "adduser",
//             element: <ManageUser />,
//           },
//           {
//             path: "adminevent",
//             element: <AdmEvents />,
//           },
//           {
//             path: "addevent",
//             element: <ManageEvents />,
//           },
//         ],
//       },
//     ],
//   },
// ]);
