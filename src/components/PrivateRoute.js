import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.accessToken ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
