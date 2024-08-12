import React, { useState, useEffect } from "react";
import "../../../App.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";
import Alert from "react-bootstrap/Alert";
import Loader from "../../../Components/Loader";
import { TiUserAddOutline } from "react-icons/ti";
import { RiDeleteBin3Line } from "react-icons/ri";

export default function ManageUser() {
  const auth = getAuthUser();
  const [users, setUsers] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setUsers({ ...users, loading: true });
    axios
      .get("/api/users")
      .then((resp) => {
        setUsers({ ...users, results: resp.data, loading: false });
      })
      .catch((err) => {
        setUsers({
          ...users,
          loading: false,
          err: "Something went wrong, please try again later!",
        });
      });
  }, [users.reload]);

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete("/api/users/" + id, {
          headers: {
            token: auth.token,
          },
        })
        .then(() => {
          setUsers({ ...users, reload: users.reload + 1 });
        })
        .catch(() => {
          setUsers({
            ...users,
            loading: false,
            err: "Something went wrong, please try again later!",
          });
        });
    }
  };

  return (
    <div className="manage-users">
      {users.err && <Alert variant="danger">{users.err}</Alert>}
      {users.loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="top-main-head d-flex justify-content-between mb-3"
            style={{ backgroundColor: "rgb(218 233 222 / 96%)" }}
          >
            <h3 style={{ fontSize: "23px", color: "rgb(51 95 51)" }}>
              Manage Users <TiUserAddOutline fontSize={"28px"} style={{marginBottom:"3px"}}/>
            </h3>
            <Link to={"add-user"} className="add-button">
              <span className="button__text">Add User</span>
              <span className="button__icon">+</span>
            </Link>
          </div>
          <Table striped bordered hover style={{ fontSize: "16px" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.results.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="add-button"
                      style={{border:"#471a1a",boxShadow:"#471a1a", backgroundColor:"#f1d7d7" }}
                    >
                      <span className="button__text" style={{color:"#471a1a"}}>Delete</span>
                      <span className="button__icon" style={{color:"#471a1a", backgroundColor:"rgb(134, 36, 36)"}}><RiDeleteBin3Line /></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}
