import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import * as serviceWorker from "./serviceWorker";
import configureStore from "./redux/store";
import { history } from "./utils/history";
import { ToastsProvider } from "./contexts/ToastsContext";
import App from "./App";

import "react-tooltip/dist/react-tooltip.css";
import "./styles/global-styles.css";

const { store } = configureStore({}, history);

ReactDOM.render(
  <Provider store={store}>
    <ToastsProvider>
      <App />
    </ToastsProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
