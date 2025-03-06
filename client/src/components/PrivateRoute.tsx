import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute: React.FC<{ element: JSX.Element; path: string }> = ({ element, path }) => {
    const { isAuthenticated } = useAuth();

    return (
        <Route
            path={path}
            element={isAuthenticated ? element : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute; 