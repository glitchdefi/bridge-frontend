import React from "react";
import { Router, Switch } from "react-router-dom";
import { ROUTES } from "./constants";
import { PrivateRoute } from "./component/PrivateRoute";
import { history } from "./utils/history";

// Components
import { ToastListener } from "./component/Toast/ToastListener";

// Page
import BridgePortalPage from "./pages/BridgePortalPage/BridgePortal";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute
          exact
          path={ROUTES.HOMEPAGE}
          component={BridgePortalPage}
        />
        <PrivateRoute exact path={ROUTES.BRIDGE} component={BridgePortalPage} />
      </Switch>
      <ToastListener />
    </Router>
  );
};

export default App;
