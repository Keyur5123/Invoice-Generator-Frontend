import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ Component, token, userData }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(!token){
            navigate('/login');
        }
        if(userData && userData?.roleId != '1'){
            navigate('/not-found');
        }
    }, [])

    return <Component />
}

export default ProtectedRoute