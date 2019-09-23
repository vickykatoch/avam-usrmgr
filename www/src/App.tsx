import React from "react";
import "./App.css";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./store/configure-store";
import DesktopLayoutView from "./layouts/DesktopLayoutView";
import MuiDesktopLayout from "./layouts/MuiDesktopLayput";

const store = configureStore();

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <DesktopLayoutView />
      {/* <MuiDesktopLayout /> */}
    </ReduxProvider>
  );
};

export default App;
