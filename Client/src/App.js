import React from 'react'
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import './App.css';
import Navbar from './Components/Shared/Navbar';
import SideBar from './Components/Shared/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // const handleLogin = async ({ email, password }) => {
  const handleLogin = async ({ username, password }) => {
    setLoading(true);
    setErrorMessage(''); // Reset error message

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });
      localStorage.setItem('test', 'test');
      localStorage.setItem('response', JSON.stringify(response));
      const { token, user_id, username, is_admin} = response.data;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('username', username);
      localStorage.setItem('is_admin', is_admin)

      setIsAuthenticated(true);
      
      setUserRole(is_admin ? 'admin' : 'user');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

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
            {/* <Box display="flex" justifyContent="center" flexWrap="wrap"> */}
              <Outlet />
            {/* </Box> */}
          </div>
        </div>
      </div>
    </div>
  )
}



//------< new >---------
// import React, { useState } from 'react';
// import axios from 'axios';
// import Login from './Components/Auth/Login';
// import Loader from './Components/Loader';
// import AdminDashboard from './Pages/Admin/AdminDashboard';
// import UserDashboard from './Pages/User/UserDashboard';
// import Home from './Pages/Home';
// function App() {

//   return (
//     <div>
//       <Home />
//     </div>
//   );
// }

// export default App;
//--------------------<old>------------------------------
// import React, { useState } from 'react';
// import axios from 'axios';
// import Login from './Components/Auth/Login';
// import Loader from './Components/Loader';
// import AdminDashboard from './Pages/Admin/AdminDashboard';
// import UserDashboard from './Pages/User/UserDashboard';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [userRole, setUserRole] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleLogin = async ({ username, password }) => {
//     setLoading(true);
//     setErrorMessage(''); // Reset error message

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/login/', {
//         username,
//         password,
//       });

//       console.log('Response:', response.data); // Debugging line

//       const { token, user_id, username } = response.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('user_id', user_id);
//       localStorage.setItem('username', username);

//       setIsAuthenticated(true);
      
//       if (username === 'admin') {
//         setUserRole('admin');
//       } else {
//         setUserRole('user');
//       }
//     } catch (error) {
//       console.error('Error:', error.response ? error.response.data : error.message); // Improved error logging
//       setErrorMessage(error.response && error.response.data.error ? error.response.data.error : 'Invalid credentials');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : isAuthenticated ? (
//         userRole === 'admin' ? <AdminDashboard /> : <UserDashboard />
//       ) : (
//         <Login onLogin={handleLogin} errorMessage={errorMessage} />
//       )}
//     </div>
//   );
// }

// export default App;

//--------------------------------------------------


// import React, { useState } from 'react';
// import Login from './Components/Auth/Login';
// import Loader from './Components/Loader';
// import AdminDashboard from './Pages/Admin/AdminDashboard';
// import UserDashboard from './Pages/User/UserDashboard';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [userRole, setUserRole] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleLogin = async ({ email, password }) => {
//     setLoading(true);
//     setErrorMessage(''); // Reset error message

//     // Simulate an API call with hardcoded credentials
//     setTimeout(() => {
//       if (email === 'admin@example.com' && password === '12345678') {
//         setIsAuthenticated(true);
//         setUserRole('admin');
//       } else if (email === 'user@example.com' && password === '87654321') {
//         setIsAuthenticated(true);
//         setUserRole('user');
//       } else {
//         setErrorMessage('Not Found!');
//       }
//       setLoading(false);
//     }, 2000);
//   };

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : isAuthenticated ? (
//         userRole === 'admin' ? <AdminDashboard /> : <UserDashboard />
//       ) : (
//         <Login onLogin={handleLogin} errorMessage={errorMessage} />
//       )}
//     </div>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import Login from './Components/Auth/Login';
// import Loader from './Components/Loader';
// import AdminDashboard from './Pages/Admin/AdminDashboard';
// import UserDashboard from './Pages/User/UserDashboard';
// import EventList from './Components/EventList';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [userRole, setUserRole] = useState('');

//   const handleLogin = async ({ email, password }) => {
//     setLoading(true);
//     // Simulate an API call
//     const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();

//     if (data.success) {
//       setIsAuthenticated(true);
//       setUserRole(data.role);
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : isAuthenticated ? (
//         userRole === 'admin' ? <AdminDashboard /> : <UserDashboard />
//       ) : (
//         <Login onLogin={handleLogin} />
//       )}
//     </div>
//   );
// }

// export default App;