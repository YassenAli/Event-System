import React, { useState } from 'react';
import Login from './Components/Auth/Login';
import Loader from './Components/Loader';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import UserDashboard from './Pages/User/UserDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setErrorMessage(''); // Reset error message

    // Simulate an API call with hardcoded credentials
    setTimeout(() => {
      if (email === 'admin@example.com' && password === '12345678') {
        setIsAuthenticated(true);
        setUserRole('admin');
      } else if (email === 'user@example.com' && password === '87654321') {
        setIsAuthenticated(true);
        setUserRole('user');
      } else {
        setErrorMessage('Not Found!');
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : isAuthenticated ? (
        userRole === 'admin' ? <AdminDashboard /> : <UserDashboard />
      ) : (
        <Login onLogin={handleLogin} errorMessage={errorMessage} />
      )}
    </div>
  );
}

export default App;



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