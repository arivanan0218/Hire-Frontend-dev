// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   const roles = JSON.parse(localStorage.getItem('roles')) || [];

//   // Define your role check logic here
//   const hasAccess = roles.includes('admin'); // Change 'admin' to the role you want to check

//   return token && hasAccess ? children : <Navigate to="/" />;
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles')) || [];

    // Check for roles
    const isAdmin = roles.includes('admin');
    const isUser = roles.includes('user');

    if (!token) {
        return <Navigate to="/" />;
    }

    if (isAdmin) {
        return children; // Allow access to admin dashboard
    }

    if (isUser) {
        return <Navigate to="/" />; // Redirect user to home
    }

    return <Navigate to="/" />; 
};

export default PrivateRoute;
