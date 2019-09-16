import React from "react";
import "./App.css";
import DesktopLayout from "./layouts/DesktopLayout";
import { Provider } from "react-redux";
import configureStore from "./store/configure-store";

const configuredStore = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={configuredStore}>
      <DesktopLayout />
    </Provider>
  );
};

export default App;
