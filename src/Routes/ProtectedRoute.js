import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ Component,token }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(!token){
            navigate('/login');
        }
    }, [])

    return <Component />
}

export default ProtectedRoute