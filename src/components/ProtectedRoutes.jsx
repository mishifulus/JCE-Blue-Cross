import { Navigate, Outlet } from "react-router-dom";
import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';

const ProtectedRoutes = ({ children, allowedRoles = [], allowedStates = [], redirectTo = '/login' }) => {

    //GET USER
    const { currentUser } = useContext(UserContext);

    const isAllowed = allowedRoles.includes(currentUser.role);

    const isAllowedS = allowedStates.includes(currentUser.status);

    if (isAllowed) {
        if (isAllowedS)
        {
            return children ? children : <Outlet />;
        }
        return <Navigate to="/config" replace />;
    } else {
        return <Navigate to={redirectTo} replace />;
    }
}

export default ProtectedRoutes;