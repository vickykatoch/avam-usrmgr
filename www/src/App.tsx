import React from "react";
import "./App.css";
import DesktopLayout from "./layouts/DesktopLayout";
import { Provider } from "react-redux";
import configureStore from "./store/configure-store";
import { BrowserRouter as Router, Route } from "react-router-dom";

const configuredStore = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={configuredStore}>
      <Router>
        <Route path="/" component={DesktopLayout} />
      </Router>
    </Provider>
  );
};

export default App;
