import React from "react";
import "./App.css";
import DesktopLayout from "./layouts/DesktopLayout";
import { Provider } from "react-redux";
import configureStore, { history } from "./store/configure-store";
import { Route } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";

const configuredStore = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={configuredStore}>
      <Router history={history}>
        <Route path="/" component={DesktopLayout} />
      </Router>
    </Provider>
  );
};

export default App;
