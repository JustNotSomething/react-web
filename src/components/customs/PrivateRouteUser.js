
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRouteUser = ({ element }) => {
  const token = Cookies.get('jwtToken');

  if (!token) {
    return <Navigate to="/login" />;
  }
  else
  {
    return element;    
  }

}

export default PrivateRouteUser;
