import React, { useState, useEffect } from 'react';
import '../../../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";

export default function AddUser() {
  const auth = getAuthUser();
  
  const [userData, setUserData] = useState({ 
    username: '', 
    email: '', 
    password: '',
    err: "",
    success: null,
    reload:false,
    loading: false, 
  });


  // const [isEditing, setIsEditing] = useState(false);
  // const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    setUserData({ ...userData, loading: true });
    axios.get("/api/users")
      .then((resp) => {
        setUserData({ ...userData, results: resp.data, loading: false });
      })
      .catch((err) => {
        setUserData({
          ...userData,
          loading: false,
          err: "somthing went wrong, please try again later!",
        });
      });
  }, [userData.reload]);

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await fetch('/api/users');
  //     const data = await response.json();
  //     setUsers(data);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

    //CREATE EVENT ON SUBMIT 
    const createUser = (e) => {
      e.preventDefault();
      setUserData({ ...userData, loading: true });
      const formData = new formData();
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      axios.post("/api/users", formData, {
          header: {
            token: auth.token,
          },
        })
        .then((resp) => {
          setUserData({ ...userData, success: "User Created Successfully" });
        })
        .catch((err) => {
          setUserData({
            ...userData,
            success: null,
            err: "some thing went wrong, please try again later!",
          });
        });
    };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (isEditing) {
  //     await updateUser();
  //   } else {
  //     await createUser();
  //   }
  // };

  // const createUser = async () => {
  //   try {
      
  //     const response = await fetch('/api/users', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(userData),
  //     });

  //     if (response.ok) {
  //       await fetchUsers();
  //       setUserData({ username: '', email: '', password: '' });
  //     } else {
  //       // Handle error
  //     }
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //   }
  // };

  // const updateUser = async () => {
  //   try {
  //     const response = await fetch(`/api/users/${editUserId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(userData),
  //     });

  //     if (response.ok) {
  //       fetchUsers();
  //       setUserData({ username: '', email: '', password: '' });
  //       setIsEditing(false);
  //       setEditUserId(null);
  //     } else {
  //       // Handle error
  //     }
  //   } catch (error) {
  //     console.error('Error updating user:', error);
  //   }
  // };

  // const handleEdit = (user) => {
  //   setUserData({ username: user.username, email: user.email, password: '' });
  //   setIsEditing(true);
  //   setEditUserId(user._id);
  // };

  // const handleDelete = async (userId) => {
  //   try {
  //     const response = await fetch(`/api/users/${userId}`, {
  //       method: 'DELETE',
  //     });

  //     if (response.ok) {
  //       fetchUsers();
  //     } else {
  //       // Handle error
  //     }
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };

  return (
    <div className="manage-user-container">
      <div className="add-nav">
        <h3 style={{fontSize:"23px"}}>Add User</h3>
      </div>
      <form onSubmit={createUser} className="manage-user-form">
      {userData.err && (
          <Alert variant={"danger"} className="auth-alert w-100">
            {userData.err}
          </Alert>
        )}
        {userData.success && (
          <Alert variant={"success"} className="auth-alert w-100">
            {userData.success}
          </Alert>
        )}
      <Container>
      <Row>
        <Col sm={11}>
        <Row>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="manage-user-input"
        />
        </Row>
        <Row>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="manage-user-input"
        />
        </Row>
        <Row>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="manage-user-input"
        />
        </Row>
        </Col>
        <Col sm={1}>
	      <button type="submit" className="manage-user-button">
          {/* {isEditing ? 'Update User' : 'Add'} */}
          Create User
        </button>
        </Col>
      </Row>
    </Container>
      </form>
      {/* <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-list-item">
            <span>{user.username} ({user.email})</span>
            <button onClick={() => handleEdit(user)} className="edit-button">Edit</button>
            <button onClick={() => handleDelete(user._id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div> */}
    </div>
  );
}




/* Backend */

// // Create a new user
// app.post('/api/users', async (req, res) => {
//   const { username, email, password } = req.body;
//   const newUser = new User({ username, email, password });
//   await newUser.save();
//   res.status(201).json(newUser);
// });

// // Get all users
// app.get('/api/users', async (req, res) => {
//   const users = await User.find();
//   res.status(200).json(users);
// });

// // Update a user
// app.put('/api/users/:id', async (req, res) => {
//   const { id } = req.params;
//   const { username, email, password } = req.body;
//   const updatedUser = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
//   res.status(200).json(updatedUser);
// });

// // Delete a user
// app.delete('/api/users/:id', async (req, res) => {
//   const { id } = req.params;
//   await User.findByIdAndDelete(id);
//   res.status(204).send();
// });
