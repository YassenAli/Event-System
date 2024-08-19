import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getAuthUser } from '../helper/Storage'

export default function Guest() {
    const auth= getAuthUser();
    console.log('guest', auth);
return (
    <>
        {
            (!auth)? <Outlet /> : <Navigate to={'/'}/>
        }
    </>
)}
