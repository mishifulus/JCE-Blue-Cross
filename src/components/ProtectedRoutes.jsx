import { Navigate, Outlet } from "react-router-dom";
import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';

const ProtectedRoutes = ({ children, allowedRoles = [], redirectTo = '/login' }) => {

    //GET USER
    const { currentUser } = useContext(UserContext);

    const isAllowed = allowedRoles.includes(currentUser.role);

    if (isAllowed) {
        return children ? children : <Outlet />;
    } else {
        return <Navigate to={redirectTo} replace />;
    }
}

export default ProtectedRoutes;