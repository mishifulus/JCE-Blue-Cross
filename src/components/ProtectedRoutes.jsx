import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react'

const ProtectedRoutes = ( {isAllowed, rol, redirectTo = '/login', children} ) => {
    //OBTENER EL USUARIO

    if(isAllowed)
    {
        return children ? children : <Outlet/>
    }
    else
    {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
}

export default ProtectedRoutes;