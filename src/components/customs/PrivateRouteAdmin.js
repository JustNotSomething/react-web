
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const PrivateRouteAdmin = ({ element, role }) => {
  const token = Cookies.get('jwtToken');

  if (!token) {
    return <Navigate to="/login" />;
  }

  const userRole = jwtDecode(token).role;

  if (role && !role.includes(userRole)) {
    return <Navigate to="/main" />;
  }

  return element;
};

export default PrivateRouteAdmin;
