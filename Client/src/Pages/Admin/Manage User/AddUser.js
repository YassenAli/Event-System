import React, { useState, useEffect } from "react";
import "../../../App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser, getAccessToken, getRefreshToken } from "../../../helper/Storage";

export default function AddUser() {
  const auth = getAuthUser();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    err: "",
    success: null,
    reload: false,
    loading: false,
  });

  // const [isEditing, setIsEditing] = useState(false);
  // const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    setUserData({ ...userData, loading: true });
    axios
      .get("http://127.0.0.1:8000/api/users")
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //CREATE EVENT ON SUBMIT
  const createUser = (e) => {
    e.preventDefault();
    setUserData({ ...userData, loading: true });
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    axios
      .post("http://127.0.0.1:8000/api/signup/", formData, {
        header: {
          Authorization: `Bearer ${getAccessToken()}`,
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
        <h3 style={{ fontSize: "23px" }}>Add User</h3>
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
