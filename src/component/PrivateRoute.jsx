import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { PrivateLayout } from "./PrivateLayout";
import { ROUTES } from "../constants";
import { get, isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { history } from "../utils/history";

export const PrivateRoute = ({
  component: Component,
  userInfo = null,
  ...rest
}) => {
  const isLoggedIn = useSelector((state) =>
    get(state, "user.isLoggedIn", false)
  );

  useEffect(() => {
    if (!isLoggedIn) history.replace(ROUTES.LOGIN);
  }, []);
  return (
    <Route
      {...rest}
      render={
        (props) => (
          <PrivateLayout>
            <Component {...props} />
          </PrivateLayout>
        )
      }
    />
  );
};
