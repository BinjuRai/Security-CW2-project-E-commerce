

import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";
import React from 'react';



export default function AdminRoute() {
    const { user, loading } = useContext(AuthContext);

   
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }


    if (!user) {
        return <Navigate to="/login" replace />;
    }

    
    if (user.role !== "admin") {
        return <Navigate to="/unauthorized" replace />;
    }


    return <Outlet />;
}