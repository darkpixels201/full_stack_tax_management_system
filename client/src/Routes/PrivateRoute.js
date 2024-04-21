import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const navigate = useNavigate()
  // Check if the user is authenticated (you need to implement your authentication logic)
  const isAuthenticated = useSelector((state) => state && state?.authReducer?.token);

  return (
    <Route
      {...rest}
    //   render={(props) =>
        element = {isAuthenticated ? <Element /> : navigate("/login")}
    //   }
    />
  );
};

export default PrivateRoute;