import { useUser } from 'context/user';
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ requiredAdmin, children }) {
    const { user } = useUser();

    if (!user || (requiredAdmin && !user.isAdmin))
        return <Navigate to="/" replace />;

    return <div>{children}</div>;
}

export default ProtectedRoute;
