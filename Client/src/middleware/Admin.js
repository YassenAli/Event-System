import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getAuthUser } from '../helper/Storage';
import { jwtDecode } from 'jwt-decode';  // Correct import

export default function Admin() {
  const auth = getAuthUser();

  // Decode the token to check the user's role
  let isAdmin = false;
  if (auth) {
    const decodedToken = jwtDecode(auth.accessToken);  // Correct usage
    console.log("decode Token:", decodedToken);
    isAdmin = decodedToken?.is_superuser || false;
  }

  return (

    <>
      {isAdmin ? <Outlet /> : <Navigate to={'/'}/>}
    </>
  );
}

