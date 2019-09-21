import React from "react";
import "./App.css";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./store/configure-store";
import DesktopLayoutView from "./layouts/DesktopLayoutView";

const store = configureStore();

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <DesktopLayoutView />      
    </ReduxProvider>
  );
};

export default App;
