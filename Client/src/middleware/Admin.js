
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getAuthUser } from '../helper/Storage'

export default function Admin() {
    const auth= getAuthUser();
return (
    <>
    {auth ? <Outlet /> : <Navigate to={'/'}/>}</>
)}