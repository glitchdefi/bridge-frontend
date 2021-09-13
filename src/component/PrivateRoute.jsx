import React from "react";
import { Route } from "react-router-dom";
import { PrivateLayout } from "./PrivateLayout";

export const PrivateRoute = ({ component: Component }) => {
  return (
    <Route
      render={(props) => (
        <PrivateLayout>
          <Component {...props} />
        </PrivateLayout>
      )}
    />
  );
};
