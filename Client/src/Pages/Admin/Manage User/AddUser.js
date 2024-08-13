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
    axios.get("/api/signup/")
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


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
  // };

    //CREATE EVENT ON SUBMIT 
    const createUser = (e) => {
      e.preventDefault();
      setUserData({ ...userData, loading: true });
      

      const token = localStorage.getItem('token');

      const formData = new formData();
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      axios.post("/api/signup/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
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
          onChange={(e) => setEventData({...userData, username: e.target.value})} //onChange={(e) => setEventData({...userData, username: e.target.value})}
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
          onChange={(e) => setEventData({...userData, email: e.target.value})}
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
          onChange={(e) => setEventData({...userData, password: e.target.value})}
          placeholder="Password"
          required
          className="manage-user-input"
        />
        </Row>
        </Col>
        <Col sm={1}>
	      <button type="submit" className="manage-user-button">
          Create User
        </button>
        </Col>
      </Row>
    </Container>
      </form>
    </div>
  );
}




/* Backend */

// // Create a new user
// app.post('/api/signup/', async (req, res) => {
//   const { username, email, password } = req.body;
//   const newUser = new User({ username, email, password });
//   await newUser.save();
//   res.status(201).json(newUser);
// });

// // Get all users
// app.get('/api/signup/', async (req, res) => {
//   const users = await User.find();
//   res.status(200).json(users);
// });

// // Update a user
// app.put('/api/signup//:id', async (req, res) => {
//   const { id } = req.params;
//   const { username, email, password } = req.body;
//   const updatedUser = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
//   res.status(200).json(updatedUser);
// });

// // Delete a user
// app.delete('/api/signup//:id', async (req, res) => {
//   const { id } = req.params;
//   await User.findByIdAndDelete(id);
//   res.status(204).send();
// });
