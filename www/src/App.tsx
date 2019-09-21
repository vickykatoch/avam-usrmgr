import React from "react";
import "./App.css";
import DesktopLayout from "./layouts/DesktopLayout";
import { Provider } from "react-redux";
import configureStore from "./store/configure-store";
import DesktopLayoutView from "./layouts/DesktopLayoutView";

const configuredStore = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={configuredStore}>
      <DesktopLayoutView />
      {/* <DesktopLayout /> */}
      {/* <Router history={history}>
        <Switch>
          <Route path="/" component={DesktopLayout} exact />
          <Route path="/usermgr/:id" component={ManageUser} />
          <Route path="/usermgr" component={DesktopLayout} />
        </Switch>
      </Router> */}
    </Provider>
  );
};

export default App;
