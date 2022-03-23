import React from 'react'
import { Navigate, Outlet } from "react-router-dom";


function PrivateAdminOutlet() {
     const adminToken = localStorage.getItem("adminToken");

    return <div>{adminToken ? <Outlet/> : <Navigate to={"/adminlogin"}/>}</div>
}

export default PrivateAdminOutlet;
