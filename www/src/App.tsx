import React from "react";
import "./App.css";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./store/configure-store";
import DesktopLayoutView from "./layouts/DesktopLayoutView";
import MuiDesktopLayout from "./layouts/MuiDesktopLayput";
import { BrowserRouter as Router } from "react-router-dom";

const store = configureStore();

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <Router>
        {/* <DesktopLayoutView /> */}
        <MuiDesktopLayout />
      </Router>
    </ReduxProvider>
  );
};

export default App;
