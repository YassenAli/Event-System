import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser, getAccessToken } from "../helper/Storage";
import * as JWT from "jwt-decode";

// then use
export default function Admin() {
  const auth = getAuthUser();

  let isAdmin = false;

  console.log("admin.js auth", auth);

  if (auth && getAccessToken()) {
    try {
      const decodedToken = JWT.jwtDecode(getAccessToken());
      console.log("Decoded Token:", decodedToken);
      isAdmin = decodedToken?.is_superuser || false;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  } else {
    console.error("Access token is missing or invalid.");
  }

  return <>{isAdmin ? <Outlet /> : <Navigate to={"/"} />}</>;
}
