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

  const handleLogin = async (data ) => {
    setLoading(true);
    setErrorMessage(''); // Reset error message
    
    console.log(data)

    try {
      localStorage.setItem('response', JSON.stringify(data));
      const { token, user_id, username, is_admin } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('username', username);
      localStorage.setItem('is_admin', is_admin);

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